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
import Michigan from "./michiganData.js"
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
      layers:{}
    }
    this.handleTrackedState = this.handleTrackedState.bind(this)
  }
  componentDidMount(){
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFya21vZWxsZXJ1dmEiLCJhIjoiY2o0dXFsa2F6MG44eTJ4cGwxZ2hrOHVkbCJ9.oXW5yLvO_PXRxDBCwA5DRQ';

    var bounds = [
      [-130.558390, 23.810610], // Southwest coordinates
      [-63.211476, 50.854057]  // Northeast coordinates
    ];

    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: "mapbox://styles/mapbox/satellite-streets-v10", //stylesheet location
        center: [-98.089702, 39.941827],
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

      var michLayers = {}

      Michigan.layers.forEach((layer, index)=>{
        console.log(layer.data.properties.id)
        var newLayer = map.addLayer({
              "id": layer.data.properties.id,
              "type": "fill",
              "description": "Hello World",
              "source": layer,
              "paint": {
                  "fill-color": "#888888",
                  "fill-opacity": 0.4
              }
              // "filter": ["==", "$type", "Polygon"]
          });
          map.setLayoutProperty(layer.data.properties.id, 'visibility', 'none');
          // michLayers[layer.data.properties.id
      })

      var name = Michigan.name

      self.setState({
        layers: {michigan: michLayers}
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

        // map.addLayer({
        //     "id": "upperPen",
        //     "type": "fill",
        //     "description": "Hello World",
        //     "source": "upperPen",
        //     // 'minzoom': 7,
        //     "paint": {
        //         "fill-color": "#888888",
        //         "fill-opacity": 0.4
        //     },
        //     "filter": ["==", "$type", "Polygon"]
        // });

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
           <Route path="/michigan" render={() => <Dashboard myMap={this.state.thisMap} data={Michigan.data} layers={this.state.layers.michigan}/>} />
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
