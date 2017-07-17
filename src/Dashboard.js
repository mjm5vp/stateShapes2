import React, { Component } from 'react'
import { Link } from "react-router-dom"
import "./Dashboard.css"

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [
        {description: "Test description 0", zoom: 9, pitch: 60, bearing: 0, center: [-87.03369140625,46.13417004624326]},
        {description: "1 Description", zoom: 8, pitch: 40, bearing: 10, center: [-83.49609375,41.73852846935917]},
        {description: "Description 2", zoom: 7, pitch: 50, bearing: -10, center: [-85.27587890625,46.042735653846506]},
        {description: "3rd Description", zoom: 9, pitch: 60, bearing: 20, center: [-83.84765625,46.01222384063236]},
      ],
      currentSlide: 0,
      currentData: {}
    }
    this.nextSlide = this.nextSlide.bind(this)
    this.flyMap = this.flyMap.bind(this)
  }




  componentDidMount(){

    this.setState({currentData: this.state.data[0]}, () => {
      console.log("currentData description: " + this.state.currentData.description)

      this.flyMap()
    });






  }

  nextSlide(e){

    var slideNum = this.state.currentSlide + 1

    if(slideNum < this.state.data.length){
      this.setState({
        currentSlide: slideNum,
        currentData: this.state.data[slideNum]
      }, () => {
        console.log("next slide")

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
        <p>{this.state.currentData.description}</p>
        <button className="nextSlideButton" onClick={this.nextSlide}>Next Slide</button>
      </div>
    );
  }
}

export default Dashboard;
