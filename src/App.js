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
      pathName: "/events/michigan",
      thisMap: null,
      redirect: false,
      layers:{},
      visLayers: Michigan.visibleLayers
    }
    // this.handleTrackedState = this.handleTrackedState.bind(this)
  }
  componentDidMount(){
    console.log(this.state.pathName)
    var self = this
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

    map.on('load', function () {

      var michLayers = []

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
              },
              "filter": ["==", "$type", "Polygon"]
          });
          map.setLayoutProperty(layer.data.properties.id, 'visibility', 'none');
          michLayers.push(layer.data.properties.id)
      })

      var allVisLayers = []

      Michigan.visibleLayers.forEach((visLayer, index)=>{
        console.log(visLayer.data.properties.id)
        var newLayer = map.addLayer({
              "id": visLayer.data.properties.id,
              "type": "circle",
              "source": visLayer,
              "paint": {
                  "circle-radius": 6,
                  "circle-color": "#B42222"
              },
              "filter": ["==", "$type", "Point"],
          });
          // map.setLayoutProperty(layer.data.properties.id, 'visibility', 'none');
          allVisLayers.push({name: visLayer.data.properties.name, id: visLayer.data.properties.id})
      })




      var name = Michigan.name

      self.setState({
        layers: {michigan: michLayers}
      })

      self.setState({
        visLayers: allVisLayers
      })


      allVisLayers.forEach((layer, index) => {
        map.on('click', layer.id, function (e) {

            map.flyTo({
              // center: e.features[0].geometry.coordinates,
              center: [-87.94072662756412,47.09605579375477],
              zoom: 6,
              pitch: 0
            });

            console.log("redirect: " + self.state.redirect)
            console.dir("e: " + e.source)

            var newPathName = `/events/${layer.name}`

            self.setState({
              pathName: newPathName,
              redirect: true
            })

            $(".info").css("display", "unset")

            console.log("redirect: " + self.state.redirect)
        });
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
    $(".info").css("display", "none")
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






    return (
<Router>
  <div id='full'>
    <div id='map'>
    </div>

{/* {{pathname,state: {name: layer.id}}} */}
    <Link to={this.state.pathName}>
              <div className="info" onClick={this.closeButton}>Go to Component</div>
            </Link>



    {/* {infoButton} */}

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
           {/* render={() => <Dashboard */}
           <Route path="/events/:name" render={() => <Dashboard myMap={this.state.thisMap} data={Michigan.data} layers={this.state.layers.michigan}/>} />
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
