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
