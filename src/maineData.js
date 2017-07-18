var mainePoint = {
  "type": "geojson",
  "data": {
    "type": "Feature",
    "properties": {
        "id": "mainePoint",
        "name": "maine"
      },
    "geometry": {
        "type": "Point",
        "coordinates": [-78.58131,46.467566]
    }
  }
}

var testPoint2 = {
  "type": "geojson",
  "data": {
    "type": "Feature",
    "properties": {
        "id": "testPoint2",
        "name": "test2"
      },
    "geometry": {
        "type": "Point",
        "coordinates": [-78.58131,40.467566]
    }
  }
}


var upperPen2 = {

  "type": "geojson",
  "data": {

    "geometry": {
      "coordinates": [
        [
          [-87.61701726288256,45.19243907754256],
          [-86.9629491062213,45.847115802626064],
          [-84.7827219173392,45.98795849984768],
          [-83.49015865536225,45.94466036031622],
          [-83.6303161175059,46.07445325462396],
          [-84.01964240123216,46.07445325462396],
          [-84.1597998633758,46.29009800593096],
          [-84.59584530115221,46.47273110747608],
          [-85.00074463623082,46.494177192758116],
          [-84.969598533533,46.76154006152444],
          [-85.56137448479856,46.67612762055791],
          [-86.16872348741646,46.6654415584909],
          [-86.65148807923622,46.4512765678264],
          [-87.04081436296929,46.52633046948756],
          [-87.38342149264543,46.50489706512644],
          [-87.64816336558039,46.84681730988868],
          [-88.16207406010479,46.96385282903151],
          [-88.45796203573757,46.772207110403826],
          [-88.36452372764408,47.07002705536172],
          [-88.05306270065898,47.302867412107446],
          [-87.91290523851534,47.387283452502516],
          [-87.71045557098284,47.46103676210174],
          [-87.99077049526332,47.47156451433051],
          [-88.2866584708961,47.39782596618767],
          [-88.56697339518337,47.26060876469586],
          [-88.92515357621181,47.016966331464886],
          [-89.33005291129041,46.85746746145321],
          [-89.68823309231885,46.82551067074081],
          [-89.89068275985817,46.82551067074081],
          [-90.07755937605194,46.6654415584909],
          [-90.40459345438256,46.558464725776446],
          [-90.06198632469963,46.311615963256884],
          [-88.94072662756412,46.09605579375477],
          [-88.61369254922673,46.009594878736806],
          [-88.08420880335682,45.90132837702927],
          [-88.08420880335682,45.771129348508566],
          [-87.89733218716982,45.71678984174969],
          [-87.77274777637851,45.5861592172532],
          [-87.78832082772402,45.30208089022429],
          [-87.61701726288256,45.19243907754256]
        ]
      ],
      "type": "Polygon"
    },
    "type": "Feature",
    "properties": {
      "id": "upperPen2",
    }
  }

}

var toledoPoint2 = {

  "type": "geojson",
  "data": {

    "geometry": {
      "coordinates": [
        [
          [-83.4796142578125,41.71187978193456],
          [-83.60183715820312,41.69855129353962],
          [-83.59634399414061,41.6257084937525],
          [-83.4521484375,41.64007838467894],
          [-83.4796142578125,41.71187978193456]
        ]
      ],
      "type": "Polygon"
    },
    "type": "Feature",
    "properties": {
      "id": "toledoPoint2",
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
  layers: [upperPen2, toledoPoint2],
  visibleLayers: [mainePoint, testPoint2]
  // visibleLayers: [{"michigan": michPoint}]
}
