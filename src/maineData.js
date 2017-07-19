var mainePoint = {
  "type": "geojson",
  "data": {
    "type": "Feature",
    "properties": {
        "id": "mainePoint",
        "name": "maine",
        "circleRadius": 8,
        "circleColor": "blue",
        "minzoom": 5,
        "question": "Why is Maine's border so strange?"
      },
    "geometry": {
        "type": "Point",
        "coordinates": [-68.90556395800338, 46.90241373412377]
    }
  }
}


var data = [
  {
    description: "Maine description 0",
    zoom: 9,
    pitch: 60,
    bearing: 0,
    center: [-77.03369140625,46.13417004624326],
    toggleLayer: {
      toggle: false,
      toggleState: null,
      layer: null
    },
    showLayer: {
      show: false,
      layer: null
    },
    hideLayer: {
      hide: false,
      layer: null
    }
  },
  {
    description: "1 Maine",
    zoom: 8,
    pitch: 40,
    bearing: 10,
    center: [-73.49609375,41.73852846935917],
    toggleLayer: {
      toggle: false,
      toggleState: null,
      layer: null
    },
    showLayer: {
      show: true,
      layer: "toledoPoint"
    },
    hideLayer: {
      hide: false,
      layer: null
    }
  },
  {
    description: "Maine 2",
    zoom: 7,
    pitch: 50,
    bearing: -10,
    center: [-75.27587890625,46.042735653846506],
    toggleLayer: {
      toggle: true,
      toggleState: "on",
      layer: "upperPen"
    },
    showLayer: {
      show: true,
      layer: "upperPen"
    },
    hideLayer: {
      hide: true,
      layer: "toledoPoint"
    }
  },
  {
    description: "3rd Maine",
    zoom: 9,
    pitch: 60,
    bearing: 20,
    center: [-73.84765625,46.01222384063236],
    toggleLayer: {
      toggle: true,
      toggleState: "off",
      layer: "upperPen"
    },
    showLayer: {
      show: false,
      layer: null
    },
    hideLayer: {
      hide: true,
      layer: "upperPen"
    }
  },
]

// console.log(data[0].addaLayer.layer)

module.exports = {
  name: "maine",
  data: data,
  layers: [],
  visibleLayers: [mainePoint]
  // visibleLayers: [{"michigan": michPoint}]
}
