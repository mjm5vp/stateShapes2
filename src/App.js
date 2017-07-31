import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import axios from "axios"
import Dashboard from "./Dashboard"
import Home from "./Home"
import mapboxgl from 'mapbox-gl';
import michiganUP from "./initialLayers/michiganUP.js"
import maineNorth from "./initialLayers/maineNorth.js"
import masonDixonLine from "./initialLayers/masonDixon.js"
import minnesotaNotch from "./initialLayers/minnesotaNotch.js"
import georgiaNorth from "./initialLayers/georgiaNorth.js"
import kentuckyIsland from "./initialLayers/kentuckyIsland.js"
import mississippiRiver from "./initialLayers/mississippiRiver.js"
import dc from "./initialLayers/dc.js"

import allStates from "./fullStates/fullStates.js"

import $ from "jquery";
import "./App.css"

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: "",
      pathName: "",
      thisMap: null,
      redirect: false,
      allLayers:[],
      visLayers: [],
      sendData: {},
      saveData: {},
      showImage: true,
      question: "",
      allFiles: [maineNorth, michiganUP, minnesotaNotch, georgiaNorth, kentuckyIsland, mississippiRiver, dc]

    }
     this.closeButton = this.closeButton.bind(this)
     this.revert = this.revert.bind(this)
     this.compOn = this.compOn.bind(this)
     this.testClick = this.testClick.bind(this)

  }
  componentDidMount(){


    console.log(this.props)
    var self = this
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFya21vZWxsZXJ1dmEiLCJhIjoiY2o0dXFsa2F6MG44eTJ4cGwxZ2hrOHVkbCJ9.oXW5yLvO_PXRxDBCwA5DRQ';
    var allLayers = []
    var bounds = [
      [-130.558390, 23.810610], // Southwest coordinates
      [-63.211476, 50.854057]  // Northeast coordinates
    ];

    var map = new mapboxgl.Map({
        container: 'map', // container id
        // style: "mapbox://styles/markmoelleruva/cj5b7btrz17vn2rqx1ldub98b",
        style: "mapbox://styles/markmoelleruva/cj5b7btrz17vn2rqx1ldub98b",
        center: [-98.089702, 39.941827],
        zoom: 3, // starting zoom
        maxBounds: bounds
    });

    this.setState({
      thisMap: map
    })

    map.on('load', function () {


      allStates.layers[0].features.forEach((state, index) => {
        console.log(state.properties.name)
        var newLayer = map.addLayer({
              "id": ("full" + state.properties.name),
              "type": "fill",
              "source": {
                type: "geojson",
                data: state},
              "minzoom": state.properties.minzoom || 1,
              "paint": {
                  "fill-opacity": .5,
                  "fill-color": "#B42222"
              },
              "filter": ["==", "$type", "Polygon"],
          });
          map.setLayoutProperty(("full" + state.properties.name), 'visibility', 'none');
          allLayers.push({id: ("full" + state.properties.name)})

      })

      map.on('click', function(e){
        console.log(map.getZoom())
        console.log(e.lngLat)
      })

      self.state.allFiles.forEach((file, index) => {
        file.layers.forEach((layer, index)=>{

          if(layer.data.geometry.type == "Point"){
          console.log("invisible point " + layer.data.properties.id)
          var newLayer = map.addLayer({
                "id": layer.data.properties.id,
                "type": "symbol",
                "description": "Hello World",
                "source": layer,
                "paint": {
                    // "color": "#888888",
                    // "opacity": 0.4
                },
                "layout": {
                    "icon-image": "embassy-15"
                }
            });
          }else if(layer.data.geometry.type == "LineString"){
          console.log("invisible line " + layer.data.properties.id)
          var newLayer = map.addLayer({
                "id": layer.data.properties.id,
                "type": "line",
                "description": "Hello World",
                "source": layer,
                "paint": {
                    "line-color": layer.data.properties.lineColor || "#888888",
                    "line-width": layer.data.properties.lineWidth || 5
                }
            });
          }else if(layer.data.geometry.type == "Polygon"){
            console.log("invisible polygon " + layer.data.properties.id)
            var newLayer = map.addLayer({
                  "id": layer.data.properties.id,
                  "type": "fill",
                  "description": "Hello World",
                  "source": layer,
                  "paint": {
                      "fill-color": layer.data.properties.fillColor || "#888888",
                      "fill-opacity": layer.data.properties.fillOpacity || .4
                  }
              });
            }
            console.log(newLayer)
            map.setLayoutProperty(layer.data.properties.id, 'visibility', 'none');
            allLayers.push({id: layer.data.properties.id})
      })
      })


      var allVisLayers = []




      self.state.allFiles.forEach((file, index) =>{


        file.visibleLayers.forEach((visLayer, index)=>{



          if(visLayer.data.geometry.type == "Point"){
            console.log("point " + visLayer.data.properties.id)
            var newLayer = map.addLayer({
                  "id": visLayer.data.properties.id,
                  "type": "symbol",
                  "source": visLayer,
                  "minzoom": visLayer.data.properties.minzoom || 1,
                  "paint": {

                      // "circle-radius": visLayer.data.properties.circleRadius || 10,
                      // "circle-color": visLayer.data.properties.circleColor|| "#B42222"
                  },
                  "layout": {
                      "icon-image": "embassy-15"
                  }
                  // "filter": ["==", "$type", "Point"],
              });
          }else if(visLayer.data.geometry.type == "Marker"){
            console.log("marker " + visLayer.data.properties.id)
            var newLayer = map.addLayer({
                  "id": visLayer.data.properties.id,
                  "type": "marker",
                  "source": visLayer,
                  "minzoom": visLayer.data.properties.minzoom || 1,
                  "paint": {
                      "circle-radius": visLayer.data.properties.circleRadius || 10,
                      "circle-color": visLayer.data.properties.circleColor|| "#B42222"
                  },
                  "filter": ["==", "$type", "Marker"],
              });
          }else if (visLayer.data.geometry.type == "LineString") {
            console.log("line " + visLayer.data.properties.id)
            var newLayer = map.addLayer({
                  "id": visLayer.data.properties.id,
                  "type": "line",
                  "source": visLayer,
                  "minzoom": visLayer.data.properties.minzoom || 1,
                  "paint": {
                      "line-width": visLayer.data.properties.lineWidth || 10,
                      "line-color": visLayer.data.properties.lineColor|| "#B42222"
                  },
                  "filter": ["==", "$type", "LineString"],
              });
            }else if (visLayer.data.geometry.type == "Polygon") {
              console.log("polygon " + visLayer.data.properties.id)
              var newLayer = map.addLayer({
                    "id": visLayer.data.properties.id,
                    "type": "fill",
                    "source": visLayer,
                    "minzoom": visLayer.data.properties.minzoom || 1,
                    "paint": {
                        "fill-opacity": visLayer.data.properties.fillOpacity || 1,
                        "fill-color": visLayer.data.properties.fillColor|| "#B42222"
                    },
                    "filter": ["==", "$type", "Polygon"],
                });
            }




          allVisLayers.push({name: visLayer.data.properties.name, id: visLayer.data.properties.id, question: visLayer.data.properties.question})
})

// console.log(allStates.visibleLayers[0].features[0])


})





      allVisLayers.forEach((layer, index) => {
        map.on('click', layer.id, function (e) {

          map.on("click", self.testClick)


          console.log(map.getZoom())
          console.log(e.lngLat)
          var saveData = {
            center: e.lngLat,
            zoom: map.getZoom(),
            pitch: map.getPitch(),
            bearing: map.getBearing(),
          }
          console.log(saveData)

            map.flyTo({
              center: e.lngLat,
              zoom: 6,
              pitch: 0
            });

            var newPathName = `/map/${layer.name}`
            var newName = layer.name

            self.setState({
              pathName: newPathName,
              name: newName,
              redirect: true,
              saveData: saveData,
              question: layer.question
            })

            $(".info").css("display", "unset")

            console.log("redirect: " + self.state.redirect)
        });
      })

      self.setState({
        layers: allLayers
      })

      self.setState({
        visLayers: allVisLayers
      })



  })
  }


  testClick(){
    var self = this
    $(".info").css("display", "none")
    this.state.visLayers.forEach((layer, index) => {
      self.state.thisMap.on('click', layer.id, function (e) {
        $(".info").css("display", "unset")
      })
    })
  }



  openNav() {
  $(".map-overlay").css("width", "250px")
  }

  closeNav() {
    $(".map-overlay").css("width", "0px")
  }

  closeButton() {
    this.setState({
      showImage: true
    })
    $(".info").css("display", "none")
  }

  revert(){
    this.setState({
      showImage: false
    })
    this.state.layers.forEach((layer, index) => {
      console.log(layer.id)
      this.state.thisMap.setLayoutProperty(layer.id, 'visibility', 'none');

    })

  }

  compOn(){
    console.log("hello app")
  }


  render() {

    // let stocks = this.props.stocks.map((stock, i) => {
    //   let pathname = `/stocks/${stock.symbol}`
    //   return <li className="stocks-stock" key={i}>
    //            {stock.name} (<Link to={{
    //                             pathname,
    //                             state: {selectedStock: stock}
    //                           }}>
    //                           {stock.symbol}
    //                         </Link>)
    //          </li>
    // })
// console.log(this.layers)
    // console.log(this.visLayers)
    //

    // var infoButton = this.visLayers.map((layer,i) =>{
    //   let pathname = '/events/michigan'
    //  return <Link to={{pathname,state: {name: "michigan"}}}>
    //             <div className="info" onClick={this.closeButton}>Go to Component</div>
    //           </Link>
    // })
    let self = this
    let event = this.state.showImage ? function(){
      return <Dashboard myMap={self.state.thisMap} data={self.state.sendData} layers={self.state.layers} saveData={self.state.saveData} revert={self.revert} compOn={self.compOn}/>}
      : function(){
        return null
      }

      // let event = function(){
      //   return <Dashboard myMap={self.state.thisMap} data={self.state.sendData} layers={self.state.layers.michigan} saveData={self.state.saveData} revert={self.revert} compOn={self.compOn}/>
      // }
      //   (<Link to={{pathname: self.state.pathName, state: {name: "michigan"}}}>
      //           <div className="info" onClick={self.closeButton}>Go to Component</div>
      //   </Link>)






    return (
<Router>
  <div id='full'>
    <div id='map'>
    </div>

{/* {{pathname,state: {name: layer.id}}} */}
    <Link to={{pathname: `${self.state.pathName}`, state: {name: self.state.name}}}>
            <div className="info" onClick={self.closeButton}>{self.state.question}</div>
    </Link>


    {/* {event} */}



    {/* {infoButton} */}

    <span id="openNav"  onClick={this.openNav}>&#9776;</span>

    <div className='map-overlay top'>
      <div className='map-overlay-contents'>
        <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>

        <a href="http://www.howthestatesgottheirshapes.com">Home</a>

        <br/>
        <hr/>

        <div className="buyBook">
          <p>Source:</p>
          <p>Stein, Mark. How the States Got Their Shapes. New York: Smithsonian /Collins, 2009. Print.</p>
        </div>

        <br/>
        <hr/>

        <div className="buyBook">Buy on Amazon:
          <p></p>
          <a href="https://www.amazon.com/How-States-Got-Their-Shapes/dp/0061431397" target="_blank">
            How the States Got Their Shapes
          </a>
        </div>

        <br/>
        <hr/>

        <div className="buyBook">Website created by:
          <p></p>
          <a href="https://www.linkedin.com/in/mark-moeller-9b721b84/" target="_blank">Mark Moeller</a>
        </div>

      </div>
    </div>


         <div className="main">
           {/* */}
           <Route exact path="/map/:name" component={event} />

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
