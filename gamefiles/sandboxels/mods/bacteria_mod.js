elements.bacteria = {
    color: ["#e6d3f2", "#c098d9", "#6e318f", "#6e318f"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
      neighbors = [
        [-1, 0],
        [0, -1],
        [1, 0],
        [0, 1]
      ]
      if (pixel.charge) {
        if (!outOfBounds(pixel.x, pixel.y + 1) && !isEmpty(pixel.x, pixel.y + 1)) {
          if (!pixel.active && !pixel.target && pixelMap[pixel.x][pixel.y + 1].element != pixel.element) {
            pixel.target = pixelMap[pixel.x][pixel.y + 1].element
            pixel.active = true
          } else if (pixel.active || pixel.target || pixelMap[pixel.x][pixel.y + 1].element == pixel.element) {
            pixel.active = pixel.active
            pixel.target = pixel.target
          }
        }
      }
      if (pixel.active) {
        if (pixel.target) {
          for (i = 0; i < neighbors.length; i++) {
            if (!isEmpty(pixel.x + neighbors[i][0], pixel.y + neighbors[i][1], true)) {
              if (pixelMap[pixel.x + neighbors[i][0]][pixel.y + neighbors[i][1]].element == pixel.target) {
                changePixel(pixelMap[pixel.x + neighbors[i][0]][pixel.y + neighbors[i][1]], pixel.element)
                pixelMap[pixel.x + neighbors[i][0]][pixel.y + neighbors[i][1]].target = pixel.target
                pixelMap[pixel.x + neighbors[i][0]][pixel.y + neighbors[i][1]].active = true
              }
            }
          }
        }
        if (Math.random() < 0.02) {
          if (!isEmpty(pixel.x, pixel.y)) {
            if (pixelMap[pixel.x][pixel.y].element == pixel.element) {
              deletePixel(pixel.x, pixel.y)
            }
          }
        }
      }

    },
    category: "special",
    state: "solid",
    density: 1,
    conduct: elements.water.conduct + 0.1,
  },

  elements.replacer_bacteria = {
    color: ["#fcbbc0", "#f28089", "#f04f5c", "#f04f5c"],
    behavior: behaviors.WALL,
    tick: function(pixel) {
      neighbors = [
        [-1, 0],
        [0, -1],
        [1, 0],
        [0, 1]
      ]
      if (pixel.charge) {
        if (!outOfBounds(pixel.x, pixel.y + 1) && !isEmpty(pixel.x, pixel.y + 1) && !outOfBounds(pixel.x, pixel.y - 1) && !isEmpty(pixel.x, pixel.y - 1)) {
          if (!pixel.active && !pixel.target && !pixel.replacement && pixelMap[pixel.x][pixel.y + 1].element != pixel.element) {
            pixel.target = pixelMap[pixel.x][pixel.y + 1].element
            pixel.replacement = pixelMap[pixel.x][pixel.y - 1].element
            pixel.active = true
          } else if (pixel.active || pixel.target || pixel.replacement || pixelMap[pixel.x][pixel.y + 1].element == pixel.element) {
            pixel.active = pixel.active
            pixel.target = pixel.target
            pixel.replacement = pixel.replacement
          }
        }
      }
      if (pixel.active) {
        if (pixel.target && pixel.replacement) {
          for (i = 0; i < neighbors.length; i++) {
            if (!isEmpty(pixel.x + neighbors[i][0], pixel.y + neighbors[i][1], true)) {
              if (pixelMap[pixel.x + neighbors[i][0]][pixel.y + neighbors[i][1]].element == pixel.target) {
                changePixel(pixelMap[pixel.x + neighbors[i][0]][pixel.y + neighbors[i][1]], pixel.element)
                pixelMap[pixel.x + neighbors[i][0]][pixel.y + neighbors[i][1]].target = pixel.target
                pixelMap[pixel.x + neighbors[i][0]][pixel.y + neighbors[i][1]].replacement = pixel.replacement
                pixelMap[pixel.x + neighbors[i][0]][pixel.y + neighbors[i][1]].active = true
              }
            }
          }
          if (!isEmpty(pixel.x, pixel.y)) {
            if (pixelMap[pixel.x][pixel.y].element == pixel.element) {
              changePixel(pixelMap[pixel.x][pixel.y], pixel.replacement)
            }
          }
        }
      }

    },
    category: "special",
    state: "solid",
    density: 1,
    conduct: elements.water.conduct + 0.1,
  },

  elements.jammer_block = {
    color: "#c0cf7e",
    behavior: behaviors.WALL,
    tick: function(pixel) {
      neighbors = [
        [-1, 0],
        [0, -1],
        [1, 0],
        [0, 1]
      ]
      if (pixel.charge) {
        for (var i = 0; i < width; i++) {
          for (var j = 0; j < height; j++) {
            if (isEmpty(i, j, true) == false) {
              if (pixelMap[i][j].element == "bacteria") {
                if (isEmpty(i, j, true) == false) {
                  deletePixel(i, j)
                }
              } else if (pixelMap[i][j].element == "replacer_bacteria") {
                if (pixelMap[i][j].replacement) {
                  if (isEmpty(i, j, true) == false) {
                    changePixel(pixelMap[i][j], pixelMap[i][j].replacement)
                  }
                } else {
                  if (isEmpty(i, j, true) == false) {
                    deletePixel(i, j)
                  }
                }
              }
            }
          }
        }
      }
    },
    category: "special",
    state: "solid",
    density: 1,
    conduct: elements.water.conduct + 0.1,
  }