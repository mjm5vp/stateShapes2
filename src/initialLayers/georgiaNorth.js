var georgiaNorth = {

  "type": "geojson",
  "data": {
            "type": "Feature",
            "properties": {
              "id": "georgiaNorth",
              "name": "georgia",
              "lineWidth": 2,
              "lineColor": "#B50027",
              "minzoom": null,
              "question": "Why are Georgia and Tennessee still fighting over Georgia's Northern border?"
            },
            "geometry": {
              "type": "LineString",
              "coordinates": [
          [
            -85.60546875,
            34.98472184461851
          ],
          [
            -85.42076110839842,
            34.98303411100917
          ],
          [
            -85.27828216552734,
            34.985284414757196
          ],
          [
            -85.14850616455078,
            34.9864095434377
          ],
          [
            -85.01495361328124,
            34.9875346566556
          ],
          [
            -84.83230590820312,
            34.987815932544024
          ],
          [
            -84.64588165283203,
            34.98837848142154
          ],
          [
            -84.45808410644531,
            34.98837848142154
          ],
          [
            -84.32144165039061,
            34.988659754410655
          ]
        ]

            }


      }
}

var georgia35 = {

  "type": "geojson",
  "data": {
            "type": "Feature",
            "properties": {
              "id": "georgia35",
              "name": "georgia35",
              "lineWidth": 2,
              "lineColor": "blue",
              "minzoom": 5,
              "question": "Why is the Mason-Dixon line important?"
            },
            "geometry": {
              "type": "LineString",
              "coordinates": [


                [-85.60520125045012,
                  35              ],
                [
                  -84.60520125045012,
                  35
                ]
              ]

            }


      }
}


module.exports = {
  name: "georgia",
  data: null,
  layers: [georgia35],
  visibleLayers: [georgiaNorth]
  // visibleLayers: [{"michigan": michPoint}]
}
