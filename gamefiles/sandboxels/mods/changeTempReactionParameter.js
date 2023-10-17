function reactPixels(pixel1, pixel2) {
	var r = elements[pixel1.element].reactions[pixel2.element];
	if (r.setting && settings[r.setting] === 0) {
	  return false;
	}
	var changeTemp = r.changeTemp ?? true
  
	if (r.tempMin !== undefined && pixel1.temp < r.tempMin) {
	  return false;
	}
	if (r.tempMax !== undefined && pixel1.temp > r.tempMax) {
	  return false;
	}
	if (r.charged && !pixel.charge) {
	  return false;
	}
	if (r.chance !== undefined && Math.random() > r.chance) {
	  return false;
	}
	if (r.y !== undefined && (pixel1.y < r.y[0] || pixel1.y > r.y[1])) {
	  return false;
	}
	if (r.elem1 !== undefined) {
  
	  if (Array.isArray(r.elem1)) {
		var elem1 = r.elem1[Math.floor(Math.random() * r.elem1.length)];
	  } else {
		var elem1 = r.elem1;
	  }
  
	  if (elem1 == null) {
		deletePixel(pixel1.x, pixel1.y);
	  } else {
		changePixel(pixel1, elem1, changeTemp);
	  }
	}
	if (r.charge1) {
	  pixel1.charge = r.charge1;
	}
	if (r.temp1) {
	  pixel1.temp += r.temp1;
	  pixelTempCheck(pixel1);
	}
	if (r.color1) {
	  pixel1.color = pixelColorPick(pixel1, Array.isArray(r.color1) ? r.color1[Math.floor(Math.random() * r.color1.length)] : r.color1);
	}
	if (r.attr1) {
	  for (var key in r.attr1) {
		pixel1[key] = r.attr1[key];
	  }
	}
	if (r.elem2 !== undefined) {
  
	  if (Array.isArray(r.elem2)) {
		var elem2 = r.elem2[Math.floor(Math.random() * r.elem2.length)];
	  } else {
		var elem2 = r.elem2;
	  }
  
	  if (elem2 == null) {
		deletePixel(pixel2.x, pixel2.y);
	  } else {
		changePixel(pixel2, elem2, changeTemp);
	  }
	}
	if (r.charge2) {
	  pixel2.charge = r.charge2;
	}
	if (r.temp2) {
	  pixel2.temp += r.temp2;
	  pixelTempCheck(pixel2);
	}
	if (r.color2) {
	  pixel2.color = pixelColorPick(pixel2, Array.isArray(r.color2) ? r.color2[Math.floor(Math.random() * r.color2.length)] : r.color2);
	}
	if (r.attr2) {
	  for (var key in r.attr2) {
		pixel2[key] = r.attr2[key];
	  }
	}
	if (r.func) {
	  r.func(pixel1, pixel2);
	}
	return r.elem1 !== undefined || r.elem2 !== undefined;
  }