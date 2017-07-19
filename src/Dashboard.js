import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  BrowserHistory
} from "react-router-dom"
import "./Dashboard.css"
import $ from "jquery";
import axios from 'axios';
import App from "./App"
// var BrowserHistory = require('react-router/lib/BrowserHistory').default;




class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: this.props.location.state.name,
      data: [],
      layers: [],
      currentSlide: 0,
      currentData: {},
    }
    this.nextSlide = this.nextSlide.bind(this)
    this.flyMap = this.flyMap.bind(this)
    this.closeButton = this.closeButton.bind(this)
  }

// this.props.layers


  componentDidMount(){
    var self = this
    $(".testDash").css("display", "unset")
    // $(".info").css("display", "none")

    console.log("name: " + this.state.name)

    let url = "http://localhost:3001/" + this.state.name + "Slides"
    $.ajax({
      url,
      method: "GET",
      dataType: "json"
    }).then((response) => {
      self.setState({
            data: response,
            currentSlide: 0,
            currentData: response[0],
      })
  })
}

  componentDidUpdate(){
    console.log("hello")
    this.flyMap()
  }

//   .then(() => {
//     console.log("hello")
//     self.flyMap()
//     console.log(response)
//   }
//
// )

    // fetch('/users')
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data)
    //     users = data
    //   });
    //
    //   self.setState({
    //     data: users,
    //     currentData: users[0],
    //     currentSlide: 0
    //   }), () => {
    //       console.log("currentData description: " + this.state.currentData.description)
    //       self.flyMap()
    //   }


    // this.setState({
    //   currentData: this.state.data[0]
    // }, () => {
    //   console.log("currentData description: " + this.state.currentData.description)
    //   this.flyMap()
    // });
  // }

  nextSlide(e, plusOrMinus){
    console.log("data: "  + this.state.data.length)
    console.log("slideNum: "  + this.state.currentSlide)

    var slideNum = this.state.currentSlide + plusOrMinus

    if(slideNum < this.state.data.length && slideNum >= 0){
      this.setState({
        currentSlide: slideNum,
        currentData: this.state.data[slideNum]
      }, () => {
        console.log("next slide")

        if(this.state.currentData.hideLayer.hide){
          console.log("hideLayer")
          this.hideLayer()
        }

        if(this.state.currentData.showLayer.show){
          console.log("showLayer")
          this.showLayer()
        }

        this.flyMap()


      });
    }else{
      console.log("out of slides!")
    }

  }

  flyMap(){
    console.log("fly map")
    var self = this
    this.props.myMap.flyTo({
       zoom: self.state.currentData.zoom,
       pitch: self.state.currentData.pitch,
       bearing: self.state.currentData.bearing,
       center: self.state.currentData.center
    });
  }

  showLayer(){
    var myLayers = this.state.currentData.showLayer.layers
    myLayers.forEach((layer, index) => {
      this.props.myMap.setLayoutProperty(layer, 'visibility', 'visible');
    })
  }

  hideLayer(){
    var myLayers = this.state.currentData.hideLayer.layers
    myLayers.forEach((layer, index) => {
      this.props.myMap.setLayoutProperty(layer, 'visibility', 'none');
    })
  }

  closeButton(){
    console.log("close")
    var self = this
    // $(".testDash").css("display", "none")
    this.props.myMap.flyTo({
      zoom: this.props.saveData.zoom || 3,
      pitch: this.props.saveData.pitch || 0,
      bearing: this.props.saveData.bearing || 0,
      center: this.props.saveData.center ||[-95, 40]
    })
    BrowserHistory.goBack()
  }

  componentWillUnmount(){
    $(".testDash").css("display", "none")
    // $(".info").css("display", "none")
  }




  render() {


    return (
    <Router history={BrowserHistory}>


      <div className="testDash">
        <div className="descriptionField">
          <div className="descriptionText">{this.state.currentData.description}</div>
          <div className="closeButtonContainer">
            <div className="xButton"><Link to="/">X</Link></div>/>
          </div>
        </div>
        {/* <p className="descriptionField">{this.state.currentData.description}</p> */}
        {/* <div className="closeButton" onClick={this.closeButton()}>x</div> */}
        <div className="buttonContainer">
          <div className="slideButton" onClick={(e) => this.nextSlide(e,-1)}>Previous Slide</div>
          <div className="slideButton" onClick={(e) => this.nextSlide(e,1)}>Next Slide</div>
        </div>

        <div className="main">
        </div>

      </div>
    </Router>
    );
  }
}

export default withRouter(Dashboard);
