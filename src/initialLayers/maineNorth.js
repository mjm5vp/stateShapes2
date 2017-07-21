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

var maineLine = {

  "type": "geojson",
  "data": {
            "type": "Feature",
            "properties": {
              "id": "maineLine",
              "name": "maineLine",
              "lineWidth": 2,
              "lineColor": "blue",
            },
            "geometry": {
              "type": "LineString",
              "coordinates": [
          [
            -67.7812671661377,
            45.94368973156554
          ],
          [
            -67.78083801269531,
            46.01913814894498
          ],
          [
            -67.78152465820312,
            46.1087074661861
          ],
          [
            -67.78186798095703,
            46.20003253082822
          ],
          [
            -67.78255462646484,
            46.30733557227205
          ],
          [
            -67.78976440429688,
            46.74738913515841
          ],
          [
            -67.7911376953125,
            47.068251086353435
          ]
        ]

            }


      }
}

var maineConnecticutPoint = {
  "type": "geojson",
  "data": {
    "type": "Feature",
    "properties": {
        "id": "maineConnecticutPoint",
        "name": "maineConnecticutPoint",
        "circleRadius": 8,
        "circleColor": "blue",
      },
    "geometry": {
        "type": "Point",
        "coordinates": [-71.504547, 45.008301]
    }
  }
}



module.exports = {
  name: "maine",
  data: null,
  layers: [maineLine, maineConnecticutPoint],
  visibleLayers: [mainePoint]
}
