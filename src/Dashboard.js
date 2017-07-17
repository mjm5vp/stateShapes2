import React, { Component } from 'react'
import { Link } from "react-router-dom"
import "./Dashboard.css"

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: this.props.data,
      layers: this.props.layers,
      currentSlide: 0,
      currentData: {}
    }
    this.nextSlide = this.nextSlide.bind(this)
    this.flyMap = this.flyMap.bind(this)
  }




  componentDidMount(){

    this.setState({
      currentData: this.state.data[0]
    }, () => {
      console.log("currentData description: " + this.state.currentData.description)
      this.flyMap()
    });
  }

  nextSlide(e, plusOrMinus){

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
    this.props.myMap.setLayoutProperty(this.state.currentData.showLayer.layer, 'visibility', 'visible');
  }

  hideLayer(){
    this.props.myMap.setLayoutProperty(this.state.currentData.hideLayer.layer, 'visibility', 'none');
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
    return (
      <div className="testDash">
        <p className="descriptionField">{this.state.currentData.description}</p>
        <div className="buttonContainer">
          <div className="slideButton" onClick={(e) => this.nextSlide(e,-1)}>Previous Slide</div>
          <div className="slideButton" onClick={(e) => this.nextSlide(e,1)}>Next Slide</div>
        </div>

      </div>
    );
  }
}

export default Dashboard;
