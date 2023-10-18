elements.thermal_conduit = {
	hidden: true,
	category: "thermal_conduits",
	hardness: 1,
	state: "solid",
	density: 3000,
	temp: -273.15,
	behavior: behaviors.WALL,
	color: "#cf9f7f",
	insulate: true,
	properties: {
	  inputs: [],
	  outputs: [],
	  rate: 2,
	},
	tick: function(pixel) {
	  if (pixel.inputs.length == 0 && pixel.outputs.length == 0) {
		return;
	  };
  
	  for (var i = 0; i < pixel.inputs.length; i++) {
  
		var coordPair = pixel.inputs[i];
  
		var newX = pixel.x + coordPair[0];
		var newY = pixel.y + coordPair[1];
  
		if (isEmpty(newX, newY, true)) {
		  continue;
		} else {
  
		  var newPixel = pixelMap[newX][newY];
  
		  var newPixelTempKelvin = newPixel.temp + 273.15;
  
		  if (newPixelTempKelvin <= 0) {
			continue;
		  };
  
		  if (newPixelTempKelvin <= pixel.rate) {
  
			pixel.temp += newPixelTempKelvin;
			newPixel.temp = -273.15;
		  } else {
  
			pixel.temp += pixel.rate;
			newPixel.temp -= pixel.rate;
		  };
		};
	  };
  
	  if (pixelTempKelvin <= 0 || pixel.outputs.length == 0) {
		return false;
	  };
  
	  var availableOutputs = [];
  
	  for (var i = 0; i < pixel.outputs.length; i++) {
		var coordPair = pixel.outputs[i];
		var newX = pixel.x + coordPair[0];
		var newY = pixel.y + coordPair[1];
		if (!isEmpty(newX, newY, true)) {
		  availableOutputs.push([newX, newY]);
		};
	  };
  
	  var pixelTempKelvin = pixel.temp + 273.15;
	  var isDraining = (pixelTempKelvin <= pixel.rate);
	  var effectiveRate = (isDraining ? pixelTempKelvin : pixel.rate) / availableOutputs.length;
  
	  for (var i = 0; i < availableOutputs.length; i++) {
		var coordPair = availableOutputs[i];
		var newPixel = pixelMap[coordPair[0]][coordPair[1]];
		newPixel.temp += effectiveRate;
	  };
	  if (availableOutputs.length > 0) {
		isDraining ? pixel.temp = -273.15 : pixel.temp -= pixel.rate
	  };
	},
  };
  
  function defineConduitElement(nameDescriber, inputOffsetNestedArray, outputOffsetNestedArray) {
  
	var autoName = `thermal_${nameDescriber}_conduit`;
  
	elements[autoName] = {
	  category: "thermal_conduits",
	  properties: {
		inputs: inputOffsetNestedArray,
		outputs: outputOffsetNestedArray,
		rate: 2,
	  },
	  hardness: 1,
	  state: "solid",
	  density: 3000,
	  temp: -273.15,
	  behavior: behaviors.WALL,
	  color: "#cf9f7f",
	  insulate: true,
	  tick: function(pixel) {
		pixel.element = "thermal_conduit";
	  },
	};
	return autoName;
  }
  
  autoConduitTable = {
  
	up_to_down: {
	  ins: [
		[0, -1]
	  ],
	  outs: [
		[0, 1]
	  ]
	},
	up_to_left: {
	  ins: [
		[0, -1]
	  ],
	  outs: [
		[-1, 0]
	  ]
	},
	up_to_right: {
	  ins: [
		[0, -1]
	  ],
	  outs: [
		[1, 0]
	  ]
	},
  
	down_to_up: {
	  ins: [
		[0, 1]
	  ],
	  outs: [
		[0, -1]
	  ]
	},
  
	down_to_left: {
	  ins: [
		[0, 1]
	  ],
	  outs: [
		[-1, 0]
	  ]
	},
	down_to_right: {
	  ins: [
		[0, 1]
	  ],
	  outs: [
		[1, 0]
	  ]
	},
  
	left_to_up: {
	  ins: [
		[-1, 0]
	  ],
	  outs: [
		[0, -1]
	  ]
	},
	left_to_down: {
	  ins: [
		[-1, 0]
	  ],
	  outs: [
		[0, 1]
	  ]
	},
  
	left_to_right: {
	  ins: [
		[-1, 0]
	  ],
	  outs: [
		[1, 0]
	  ]
	},
  
	right_to_up: {
	  ins: [
		[1, 0]
	  ],
	  outs: [
		[0, -1]
	  ]
	},
	right_to_down: {
	  ins: [
		[1, 0]
	  ],
	  outs: [
		[0, 1]
	  ]
	},
	right_to_left: {
	  ins: [
		[1, 0]
	  ],
	  outs: [
		[-1, 0]
	  ]
	},
  
	left_and_right_to_down: {
	  ins: [
		[-1, 0],
		[1, 0]
	  ],
	  outs: [
		[0, 1]
	  ]
	},
	up_and_down_to_left: {
	  ins: [
		[0, -1],
		[0, 1]
	  ],
	  outs: [
		[-1, 0]
	  ]
	},
	left_and_right_to_up: {
	  ins: [
		[-1, 0],
		[1, 0]
	  ],
	  outs: [
		[0, -1]
	  ]
	},
	up_and_down_to_right: {
	  ins: [
		[0, -1],
		[0, 1]
	  ],
	  outs: [
		[1, 0]
	  ]
	},
  
	down_to_left_and_right: {
	  outs: [
		[-1, 0],
		[1, 0]
	  ],
	  ins: [
		[0, 1]
	  ]
	},
	left_to_up_and_down: {
	  outs: [
		[0, -1],
		[0, 1]
	  ],
	  ins: [
		[-1, 0]
	  ]
	},
	up_to_left_and_right: {
	  outs: [
		[-1, 0],
		[1, 0]
	  ],
	  ins: [
		[0, -1]
	  ]
	},
	right_to_up_and_down: {
	  outs: [
		[0, -1],
		[0, 1]
	  ],
	  ins: [
		[1, 0]
	  ]
	},
  
	up_down_and_left_to_right: {
	  ins: [
		[0, -1],
		[0, 1],
		[-1, 0]
	  ],
	  outs: [
		[1, 0]
	  ]
	},
	up_left_and_right_to_down: {
	  ins: [
		[0, -1],
		[-1, 0],
		[1, 0]
	  ],
	  outs: [
		[0, 1]
	  ]
	},
	up_down_and_right_to_left: {
	  ins: [
		[0, -1],
		[0, 1],
		[1, 0]
	  ],
	  outs: [
		[-1, 0]
	  ]
	},
	down_left_and_right_to_up: {
	  ins: [
		[0, 1],
		[-1, 0],
		[1, 0]
	  ],
	  outs: [
		[0, -1]
	  ]
	},
  
	right_to_up_down_and_left: {
	  outs: [
		[0, -1],
		[0, 1],
		[-1, 0]
	  ],
	  ins: [
		[1, 0]
	  ]
	},
	down_to_up_left_and_right: {
	  outs: [
		[0, -1],
		[-1, 0],
		[1, 0]
	  ],
	  ins: [
		[0, 1]
	  ]
	},
	left_to_up_down_and_right: {
	  outs: [
		[0, -1],
		[0, 1],
		[1, 0]
	  ],
	  ins: [
		[-1, 0]
	  ]
	},
	up_to_down_left_and_right: {
	  outs: [
		[0, 1],
		[-1, 0],
		[1, 0]
	  ],
	  ins: [
		[0, -1]
	  ]
	},
  
	left_and_down_to_right: {
	  ins: [
		[-1, 0],
		[0, 1]
	  ],
	  outs: [
		[1, 0]
	  ]
	},
	right_and_down_to_left: {
	  ins: [
		[1, 0],
		[0, 1]
	  ],
	  outs: [
		[-1, 0]
	  ]
	},
	left_and_up_to_right: {
	  ins: [
		[-1, 0],
		[0, -1]
	  ],
	  outs: [
		[1, 0]
	  ]
	},
	right_and_up_to_left: {
	  ins: [
		[1, 0],
		[0, -1]
	  ],
	  outs: [
		[-1, 0]
	  ]
	},
  };
  
  for (direction in autoConduitTable) {
	defineConduitElement(direction, autoConduitTable[direction].ins, autoConduitTable[direction].outs);
  };