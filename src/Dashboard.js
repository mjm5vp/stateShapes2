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
      name: this.props.match.params.name,
      // this.props.location.state.name,
      data: [],
      layers: [],
      currentSlide: 0,
      currentData: {},
      closePrev: true,
      closeNext: false,
      styles: {
        mine: "mapbox://styles/markmoelleruva/cj5b7btrz17vn2rqx1ldub98b",
        light: "mapbox://styles/mapbox/light-v9",
        basic: "mapbox://styles/mapbox/basic-v9"
      }
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
    // this.props.compOn()

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

  $(document).keydown(function(e) {
    console.log("key press")
    switch(e.which) {
        case 37: // left
        self.nextSlide(e,-1)
        break;

        case 38: // up
        break;

        case 39: // right
        self.nextSlide(e,1)
        break;

        case 40: // down
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
}

  componentDidUpdate(){



    this.updateDescriptionText()
    if(this.state.currentData.hideLayer.hide){
      console.log("hideLayer")
      this.hideLayer()
    }

    if(this.state.currentData.showLayer.show){
      console.log("showLayer")
      this.showLayer()
    }
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
    this.updateDescriptionText()


    var slideNum = this.state.currentSlide + plusOrMinus

    if(slideNum == 0){
      this.setState({
        closePrev: true
      })
    }else{
      this.setState({
        closePrev: false
      })
    }

    console.log("slideNum " + slideNum)
    console.log("this.state.data.length " + this.state.data.length)


    if(slideNum + 1 >= this.state.data.length) {
      this.setState({
        closeNext: true
      })
    }else{
      this.setState({
        closeNext: false
      })
    }

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
      this.closeButton()
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

  changeMapStyle(style){
    console.log("change map style")
    this.props.myMap.setStyle(this.state.styles.basic);
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
      zoom: this.props.saveData.zoom || 4,
      pitch: this.props.saveData.pitch || 0,
      bearing: this.props.saveData.bearing || 0,
      center: this.props.saveData.center ||[-95, 40]
    })
    this.props.revert()
    // BrowserHistory.goBack()
  }

  componentWillUnmount(){
    $(".testDash").css("display", "none")
    // $(".info").css("display", "none")
  }

  updateDescriptionText(){
    $(".descriptionText").html(this.state.currentData.description)
  }




  render() {

    // let prevButton = close ?
    // function() {
    //   return  (<div id="prev" className="slideButton" onClick={(e) => this.nextSlide(e,-1)}><Link to="/">Previous</Link></div>)
    // }
    // : function() {
    //   return  (<div id="prev" className="slideButton" onClick={(e) => this.nextSlide(e,-1)}>Previous</div>)
    //
    // }

    let prevButton = this.state.closePrev ?
    (<div id="prev" className="slideButton" onClick={(e) => this.nextSlide(e,-1)}><Link to="/map" className="linkText">Previous</Link></div>)
    :  (<div id="prev" className="slideButton" onClick={(e) => this.nextSlide(e,-1)}>Previous</div>)

    console.log(prevButton)

    let nextButton = this.state.closeNext ?
    (<div id="next" className="slideButton" onClick={(e) => this.nextSlide(e,1)}><Link to="/map" className="linkText">Next</Link></div>)
    : (<div id="next" className="slideButton" onClick={(e) => this.nextSlide(e,1)}>Next</div>)



    // let event = this.state.showImage ? function(){
    //   return <Dashboard myMap={self.state.thisMap} data={self.state.sendData} layers={self.state.layers.michigan} saveData={self.state.saveData} revert={self.revert} compOn={self.compOn}/>}
    //   : function(){
    //     return null
    //   }


    return (
    <Router history={BrowserHistory}>


      <div className="testDash">
        <div className="subDash">

          <div className="buttonContainer">
            {prevButton}
          </div>


          <div className="descriptionField">
            <div className="descriptionText"></div>
          </div>

          {/* <p className="descriptionField">{this.state.currentData.description}</p> */}
          {/* <div className="closeButton" onClick={this.closeButton()}>x</div> */}

          <div className="buttonContainer">
            {nextButton}
          </div>

          <div className="closeButtonContainer">
            <div onClick={this.closeButton} ><Link to="/map" className="xButton">X</Link></div>
          </div>

        </div>
      </div>
    </Router>
    );
  }
}

export default withRouter(Dashboard);
