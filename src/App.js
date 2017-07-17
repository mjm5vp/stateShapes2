import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import axios from "axios"
import Dashboard from "./Dashboard"
import Search from "./Search"
import About from "./About"
import Stock from "./Stock"
import mapboxgl from 'mapbox-gl';
import $ from "jquery";
import "./App.css"

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      points: [{
        "geometry": {
          "coordinates": [
            -87.05638741431481,
            46.203941604232966
          ],
          "type": "Point"
        },
        "type": "Feature",
        "properties": {}
      }],
      thisMap: null,
      redirect: false,
      hasTracked: false
    }
    this.handleTrackedState = this.handleTrackedState.bind(this)
  }
  componentDidMount(){
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFya21vZWxsZXJ1dmEiLCJhIjoiY2o0dXFsa2F6MG44eTJ4cGwxZ2hrOHVkbCJ9.oXW5yLvO_PXRxDBCwA5DRQ';

    var bounds = [
      // [-74.04728500751165, 40.68392799015035], // Southwest coordinates
      // [-73.91058699000139, 40.87764500765852]  // Northeast coordinates
      // [23.810610, -89.558390], // Southwest coordinates
      // [48.854057, -63.211476]  // Northeast coordinates

      [-130.558390, 23.810610], // Southwest coordinates
      [-63.211476, 50.854057]  // Northeast coordinates

    ];

    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: "mapbox://styles/mapbox/satellite-streets-v10", //stylesheet location
        // center: [-74.50, 40], // starting position
        zoom: 3, // starting zoom
        maxBounds: bounds
    });

    this.setState({
      thisMap: map
    })

//     static contextTypes = {
//   router: PropTypes.shape({
//     history: PropTypes.shape({
//       push: PropTypes.func.isRequired,
//       replace: PropTypes.func.isRequired
//     }).isRequired,
//     staticContext: PropTypes.object
//   }).isRequired
// };

    var self = this

    map.on('load', function () {

      map.addSource("upperPen", {
        "type": "geojson",
        "data": {

          "geometry": {
            "coordinates": [
              [
                [
                  -87.61701726288256,
                  45.19243907754256
                ],
                [
                  -86.9629491062213,
                  45.847115802626064
                ],
                [
                  -84.7827219173392,
                  45.98795849984768
                ],
                [
                  -83.49015865536225,
                  45.94466036031622
                ],
                [
                  -83.6303161175059,
                  46.07445325462396
                ],
                [
                  -84.01964240123216,
                  46.07445325462396
                ],
                [
                  -84.1597998633758,
                  46.29009800593096
                ],
                [
                  -84.59584530115221,
                  46.47273110747608
                ],
                [
                  -85.00074463623082,
                  46.494177192758116
                ],
                [
                  -84.969598533533,
                  46.76154006152444
                ],
                [
                  -85.56137448479856,
                  46.67612762055791
                ],
                [
                  -86.16872348741646,
                  46.6654415584909
                ],
                [
                  -86.65148807923622,
                  46.4512765678264
                ],
                [
                  -87.04081436296929,
                  46.52633046948756
                ],
                [
                  -87.38342149264543,
                  46.50489706512644
                ],
                [
                  -87.64816336558039,
                  46.84681730988868
                ],
                [
                  -88.16207406010479,
                  46.96385282903151
                ],
                [
                  -88.45796203573757,
                  46.772207110403826
                ],
                [
                  -88.36452372764408,
                  47.07002705536172
                ],
                [
                  -88.05306270065898,
                  47.302867412107446
                ],
                [
                  -87.91290523851534,
                  47.387283452502516
                ],
                [
                  -87.71045557098284,
                  47.46103676210174
                ],
                [
                  -87.99077049526332,
                  47.47156451433051
                ],
                [
                  -88.2866584708961,
                  47.39782596618767
                ],
                [
                  -88.56697339518337,
                  47.26060876469586
                ],
                [
                  -88.92515357621181,
                  47.016966331464886
                ],
                [
                  -89.33005291129041,
                  46.85746746145321
                ],
                [
                  -89.68823309231885,
                  46.82551067074081
                ],
                [
                  -89.89068275985817,
                  46.82551067074081
                ],
                [
                  -90.07755937605194,
                  46.6654415584909
                ],
                [
                  -90.40459345438256,
                  46.558464725776446
                ],
                [
                  -90.06198632469963,
                  46.311615963256884
                ],
                [
                  -88.94072662756412,
                  46.09605579375477
                ],
                [
                  -88.61369254922673,
                  46.009594878736806
                ],
                [
                  -88.08420880335682,
                  45.90132837702927
                ],
                [
                  -88.08420880335682,
                  45.771129348508566
                ],
                [
                  -87.89733218716982,
                  45.71678984174969
                ],
                [
                  -87.77274777637851,
                  45.5861592172532
                ],
                [
                  -87.78832082772402,
                  45.30208089022429
                ],
                [
                  -87.61701726288256,
                  45.19243907754256
                ]
              ]
            ],
            "type": "Polygon"
          },
          "type": "Feature",
          "properties": {}
        }

      })



    map.addSource("all-sources", {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [
            //   {
            //     "type": "Feature",
            //     "geometry": {
            //         "type": "Polygon",
            //         "coordinates": [
            //           [
            //             [-88.58131,46.467566],
            //             [-88.58131,46.209611],
            //             [-87.485857,46.206069],
            //             [-87.496095,46.464041],
            //             [-88.58131,46.467566]
            //           ]
            //         ]
            //     }
            // },

            {
              "type": "Feature",
              "properties": {
                  "description": "<strong>Make it Mount Pleasant</strong><p><a href=\"http://www.mtpleasantdc.com/makeitmtpleasant\" target=\"_blank\" title=\"Opens in a new window\">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>"
                },
              "geometry": {
                  "type": "Point",
                  "coordinates": [-88.58131,46.467566]
              }
            },

            {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [-121.505184, 40.488084]
              }
            },

            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [-121.354465, 40.488737]
                }
            },

            {
            "type": "Feature",
            "properties": {},
            "geometry": {
            "type": "Polygon",
            "coordinates": [
            [
            [
            -71.14789974636884,
            41.64758738867177
            ],
            [
            -71.1203820461734,
            41.49465098730397
            ],
            [
            -71.85382564969197,
            41.32003632258973
            ],
            [
            -71.79295081245215,
            41.46661652278563
            ],
            [
            -71.8009089830251,
            42.013249823569055
            ],
            [
            -71.37915178087496,
            42.02436025651181
            ],
            [
            -71.30507361518457,
            41.76241242122431
            ],
            [
            -71.14789974636884,
            41.64758738867177
            ]
            ]
            ]
            }
            }



          ]
        }
    });





    map.addLayer({
        "id": "all-points",
        "type": "circle",
        "description": "Hello World",
        "source": "all-sources",
        // 'minzoom': 7,
        "paint": {
            "circle-radius": 6,
            "circle-color": "#B42222"
        },
        "filter": ["==", "$type", "Point"],
    });




    map.on('click', 'all-points', function (e) {

        map.flyTo({
          // center: e.features[0].geometry.coordinates,
          center: [-87.94072662756412,47.09605579375477],
          zoom: 6,
          pitch: 0
        });

        map.addLayer({
            "id": "upperPen",
            "type": "fill",
            "description": "Hello World",
            "source": "upperPen",
            // 'minzoom': 7,
            "paint": {
                "fill-color": "#888888",
                "fill-opacity": 0.4
            },
            "filter": ["==", "$type", "Polygon"]
        });

        console.log("redirect: " + self.state.redirect)

        self.setState({
          redirect: true
        })

        $(".info").css("display", "unset")

        console.log("redirect: " + self.state.redirect)




        // new mapboxgl.Popup()
        // .setLngLat(e.features[0].geometry.coordinates)
        // .setHTML(e.features[0].properties.description)
        // .addTo(map);
        // var newDiv = $("<div></div>")
        // newDiv.append($("<p>hello</p>"))
        // newDiv.addClass("newDiv")
        // $(".info").append(newDiv)
    });


  })




  }
  handleTrackedState(newStock){
    let tempArray = this.state.stocks
    tempArray.push(newStock)
    this.setState({
      stocks: tempArray,
      hasTracked: true
    })
  }
  clickUpperPen(){
    this.state.thisMap.addLayer({
        "id": "all-polygons",
        "type": "fill",
        "description": "Hello World",
        "source": "all-sources",
        'minzoom': 7,
        "paint": {
            "fill-color": "#888888",
            "fill-opacity": 0.4
        },
        "filter": ["==", "$type", "Polygon"]
    });

  }

  openNav() {
  $(".map-overlay").css("width", "250px")
  }

  closeNav() {
    $(".map-overlay").css("width", "0px")
  }

  closeButton() {
    $(".info").css("display", "none")
  }


  render() {

    // if (this.state.redirect) {
    //   console.log("inside render")
    //   return <Redirect to="/michigan" />;
    // }




    return (
<Router>
  <div id='full'>
    <div id='map'>
    </div>




    <Link to="/michigan">
      <div className="info" onClick={this.closeButton}>Go to Component</div>
    </Link>

    <span id="openNav"  onClick={this.openNav}>&#9776;</span>

    <div className='map-overlay top'>
        <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
        <div className='map-overlay-inner'>
            <fieldset>
                <label>Select layer</label>
                <select id='layer' name='layer'>
                    <option value='water'>Water</option>
                    <option value='building'>Buildings</option>
                </select>
            </fieldset>
            <fieldset>
                <label>Choose a color</label>
                <div id='swatches'></div>
            </fieldset>
        </div>
      </div>


         <div className="main">
           <Route path="/michigan" render={() => <Dashboard myMap={this.state.thisMap} />} />
           <Route path="/about" component={About} />
           <Route path="/stocks/:symbol" component={Stock} />
        </div>

        </div>

</Router>


      // <Router>
      //   <div>
      //     <div className="nav">
      //       <div className="nav-item"><span className="nav-logo">iStocks</span></div>
      //       <div className="nav-item"><Link to="/">Home</Link></div>
      //       <div className="nav-item"><Link to="/search">Search</Link></div>
      //       <div className="nav-item"><Link to="/about">About</Link></div>
      //     </div>
      //
      //     <div className="main">
      //       <Route exact path="/" render={() => <Dashboard stocks={this.state.stocks} />} />
      //       <Route path="/search" render={() => {
      //         if(this.state.hasTracked){
      //           return <Redirect to="/" />
      //         }
      //         return <Search handleTrackedState={this.handleTrackedState} />
      //       }} />
      //     <Route path="/about" component={About} />
      //     <Route path="/stocks/:symbol" component={Stock} />
      //     </div>
      //   </div>
      // </Router>
    );
  }
}

export default App;
