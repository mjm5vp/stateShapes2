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
      stocks: [],
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




  }
  handleTrackedState(newStock){
    let tempArray = this.state.stocks
    tempArray.push(newStock)
    this.setState({
      stocks: tempArray,
      hasTracked: true
    })
  }

  openNav() {
  $(".map-overlay").css("width", "250px")
}

closeNav() {
  $(".map-overlay").css("width", "0px")
}

  render() {




    return (
<Router>
  <div id='full'>
    <div id='map'>
    </div>



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
