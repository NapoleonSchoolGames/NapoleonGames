if (typeof(randomChoices) === "undefined") {
	randomChoices = [];
  };
  
  function randomFromZeroToValue(value) {
	if (value >= 0) {
	  return Math.floor(Math.random() * (value + 1))
	} else {
	  return 0 - Math.floor(Math.random() * (Math.abs(value) + 1))
	};
  };
  
  function randomChoice(array) {
	var length = array.length;
	var randomIndex = randomFromZeroToValue(length - 1);
	return array[randomIndex];
  }
  
  elements.heat_random = {
	name: "heat-randomized powder",
	color: ["#4e5f8a", "#b334ec", "#fa96f9", "#b6ecf6", "#80ebc8", "#e9286b", "#8eed91", "#b18b30"],
	behavior: behaviors.POWDER,
	tick: function(pixel) {
	  if (pixel.temp >= 50) {
		changePixel(pixel, randomChoice(randomChoices), true);
	  };
	},
	state: "solid",
	category: "powders",
	density: 1987,
	temp: 20,
	desc: "Turns to a random element when heated to 50&deg;C",
  };
  
  elements.cold_random = {
	name: "cold-randomized powder",
	color: ["#3e5f9a", "#a334fc", "#e490ff", "#9de3ff", "#70ebd8", "#d9287b", "#7eeda1", "#a18b40"],
	behavior: behaviors.POWDER,
	tick: function(pixel) {
	  if (pixel.temp <= -50) {
		changePixel(pixel, randomChoice(randomChoices), true);
	  };
	},
	state: "solid",
	density: 1987,
	temp: 20,
	category: "powders",
	desc: "Turns to a random element when cooled to -50&deg;C",
  };
  
  elements.shock_random = {
	name: "shock-randomized powder",
	color: ["#4e6f8a", "#b344ec", "#faa6f9", "#b6fcf6", "#80fbc8", "#e9386b", "#8efd91", "#b19b30"],
	behavior: behaviors.POWDER,
	tick: function(pixel) {
	  if (pixel.charge) {
		delete pixel.charge;
		pixel.chargeCD = 1;
		changePixel(pixel, randomChoice(randomChoices), true);
	  };
	},
	conduct: 1,
	state: "solid",
	density: 1987,
	temp: 20,
	category: "powders",
	desc: "Turns to a random element when shocked",
  }