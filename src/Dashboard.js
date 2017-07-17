import React, { Component } from 'react'
import { Link } from "react-router-dom"
import "./Dashboard.css"

class Dashboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      data: [
        {description: "Test description 1", zoom: 9, pitch: 60, bearing: 0, center: [-87.03369140625,46.13417004624326]},
        {description: "Second Description", zoom: 8.5, pitch: 40, bearing: 10, center: [-83.49609375,41.73852846935917]},
        {description: "Description 3", zoom: 7, pitch: 50, bearing: -10, center: [-85.27587890625,46.042735653846506]},
        {description: "4th Description", zoom: 9, pitch: 60, bearing: 20, center: [-83.84765625,46.01222384063236]},
      ],
      currentSlide: 0,
      currentData: {}
    }
  }



  componentDidMount(){

    this.setState({
      currentData: this.state.data[0]
    })

    this.flyMap()



  }

  nextSlide(e){

    this.setState({
      currentSlide: this.state.currentSlide + 1,
    })

    this.setState({
      currentData: this.state.data[this.currentSlide]
    })
    this.flyMap()
    console.log("next slide")
  }

  flyMap(){
    console.log("fly map")
    this.props.myMap.flyTo({
      // zoom: this.state.currentData.zoom,
      // pitch: this.state.currentData.pitch,
      // bearing: this.state.currentData.bearing,
      center: this.state.currentData.center
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
