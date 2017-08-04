import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import $ from "jquery"
import "./Home.css"
import allLayerData from "./initialLayers/allLayerData"

class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      allQuestions: []
    }
  }


  componentDidMount(){

    let url = "https://state-shape-back-end.herokuapp.com/michiganSlides"
    $.ajax({
      url: url,
      type: "get",
      dataType: "json"
      // $.ajax takes an object as an argument with at least three key-value pairs...
      // (1) The URL endpoint for the JSON object.
      // (2) Type of HTTP request.
      // (3) Datatype. Usually JSON.
    }).done(() => {
      console.log("Ajax request success!")
    }).fail(() => {
      console.log("Ajax request fails!")
    }).always(() => {
      console.log("This always happens regardless of successful ajax request or not.")
    })


  }

    render() {

      return (
        <div className="homeContainer">

          <div className="titleContainer">
            <div className="title">How the States Got Their Shapes</div>
          </div>

          <div className="linkContainer">
            <Link className="linkLink" to="/map"><div className="homeLink">Map</div></Link>
            <Link className="linkLink" to="/questions"><div className="homeLink">Questions</div></Link>
          </div>
        </div>
      );
    }



}

export default Home;
