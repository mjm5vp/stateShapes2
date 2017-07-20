var masonDixonLine = {

  "type": "geojson",
  "data": {
            "type": "Feature",
            "properties": {
              "id": "masonDixonLine",
              "name": "MasonDixon",
              "lineWidth": 2,
              "lineColor": "blue",
              "minzoom": 5,
              "question": "Why is the Mason-Dixon line important?"
            },
            "geometry": {
              "type": "LineString",
              "coordinates": [


                [
                  -80.5194479227066,
                  39.72125812451018
                ],
                [
                  -80.51848769187927,
                  39.721245746181445
                ],
                [
                  -80.46867370605469,
                  39.72111783665459
                ],
                [
                  -80.37571907043457,
                  39.72118385450453
                ],
                [
                  -80.25315284729004,
                  39.72111783665459
                ],
                [
                  -80.07084846496582,
                  39.72118385450453
                ],
                [
                  -79.4767552614212,
                  39.72113021500627
                ],
                [
                  -77.41052627563477,
                  39.719896495030916
                ],
                [
                  -75.78871250152588,
                  39.72214110622662
                ],
                [
                  -75.75442314147949,
                  39.227067239343874
                ],
                [
                  -75.72489738464355,
                  38.85575072276977
                ],
                [
                  -75.69957733154297,
                  38.531516035578434
                ],
                [
                  -75.69368720054626,
                  38.46010407417173
                ],
                [
                  -75.44517517089844,
                  38.45331984821861
                ],
                [
                  -75.19214630126953,
                  38.451168926369206
                ],
                [
                  -75.12228012084961,
                  38.45130336086328
                ],
                [
                  -75.08549094200134,
                  38.451261350110805
                ],
                [
                  -75.04913628101349,
                  38.45124874688027
                ]
              ]

            }


      }
}

module.exports = {
  name: "masonDixonLine",
  data: null,
  layers: [],
  visibleLayers: [masonDixonLine]
  // visibleLayers: [{"michigan": michPoint}]
}
