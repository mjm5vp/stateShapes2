var dcPoint = {
  "type": "geojson",
  "data": {
    "type": "Feature",
    "properties": {
        "id": "dcPoint",
        "name": "dcPoint",
        "circleRadius": 8,
        "circleColor": "blue",
        "minzoom": 5,
        "question": "Why is DC shaped like this?"
      },
    "geometry": {
        "type": "Point",
        "coordinates": [-77.02980122218949, 38.916042800603975]
    }
  }
}


// console.log(data[0].addaLayer.layer)

module.exports = {
  name: "dcPoint",
  data: null,
  layers: [],
  visibleLayers: [dcPoint]
  // visibleLayers: [{"michigan": michPoint}]
}
