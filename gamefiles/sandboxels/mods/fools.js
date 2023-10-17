allproperties = {}

skipproperties = ["color", "colorOn", "forceAutoGen", "name", "category", "colorObject", "hidden", "tempHigh", "tempLow", "stateHigh", "stateLow"]
goodproperties = ["behavior", "tick"]
elements.molten_rad_glass.color = "#ffffff"

for (element in elements) {
  var elementdata = elements[element]
  if (elementdata.category === "tools") {
    continue
  }
  for (property in elementdata) {

    if (goodproperties.indexOf(property) === -1) {
      continue
    }
    if (!allproperties[property]) {
      allproperties[property] = []
    }
    allproperties[property].push(elementdata[property])
  }
}

for (element in elements) {
  var elementdata = elements[element]
  if (elementdata.category === "tools") {
    continue
  }
  for (property in elementdata) {

    if (goodproperties.indexOf(property) !== -1) {
      delete elementdata[property]
    }
  }
}

var elementlist = Object.keys(elements)
elementlist.sort(function() {
  return 0.5 - Math.random()
})

for (property in allproperties) {

  var propertyvalues = allproperties[property]

  for (var i = 0; i < elementlist.length; i++) {
    if (i >= propertyvalues.length) {
      break
    }
    var element = elementlist[i]
    var elementdata = elements[element]
    elementdata[property] = propertyvalues[i]
  }

  elementlist.sort(function() {
    return 0.5 - Math.random()
  })
}

for (element in elements) {
  elementdata = elements[element]
  if (elementdata.category === "tools") {
    continue
  }

  elementdata.tempHigh = Math.floor(Math.random() * 10000)

  elementdata.tempLow = Math.floor(Math.random() * 273) - 273
  if (elementdata.stateHigh) {
    elementdata.stateHigh = elementlist[Math.floor(Math.random() * elementlist.length)]
  }
  if (elementdata.stateLow) {
    elementdata.stateLow = elementlist[Math.floor(Math.random() * elementlist.length)]
  }
  if (elementdata.reactions) {
    for (reactant in elementdata.reactions) {
      elementdata.reactions[reactant].elem1 = elementlist[Math.floor(Math.random() * elementlist.length)]
      elementdata.reactions[reactant].elem2 = elementlist[Math.floor(Math.random() * elementlist.length)]
      elementdata.reactions[elementlist[Math.floor(Math.random() * elementlist.length)]] = elementdata.reactions[reactant]
      delete elementdata.reactions[reactant]
    }
  }

}

runAfterLoad(function() {
  pixelTempCheckTemp = pixelTempCheck
  pixelTempCheck = function(pixel) {
    try {
      pixelTempCheckTemp(pixel)
    } catch (e) {}
  }
})

runAfterLoad(function() {

  var css = document.createElement("style")
  css.innerHTML = "* { font-family: Comic Sans MS !important; }"
  document.body.appendChild(css)

  document.body.style.backgroundColor = "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")"

})