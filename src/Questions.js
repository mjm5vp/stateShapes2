import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import $ from "jquery"
import "./Questions.css"
import allLayerData from "./initialLayers/allLayerData"

class Questions extends Component {
  constructor(props){
    super(props)
    this.state = {
      allQuestions: []
    }
  }

  componentDidMount(){


  }

    render() {

  //     let stocks = this.props.stocks.map((stock, i) => {
  // let pathname = `/stocks/${stock.symbol}`
  // return <li className="stocks-stock" key={i}>
  //          {stock.name} (<Link to={{pathname,state: {selectedStock: stock}}}>{stock.symbol}</Link>)
  //        </li>
// })

      let allQuestions = allLayerData.allVisibleLayers.map((layer, index) => {
        console.log(layer.data.properties.name)
        let pathName = `/map/${layer.data.properties.name}`
        return <div className="questions" key={index}>
                 <Link to={pathName} className="questions">{layer.data.properties.question}</Link>
               </div>
      })
      console.log(allQuestions)

      // let allQuestions =  <div>
      //             <Link to='/map/michigan' className="question" >Why does Michigan have an Upper Penninsula?</Link>
      //           </div>

      return (
        <div className="questions">

          {allQuestions}

        </div>
      );
    }



}
//   constructor(props){
//     super(props)
//     this.state = {
//       searchTerm: "",
//       searchedStock: {}
//     }
//   }
//
//   handleChange(e){
//     this.setState({
//       searchTerm: e.target.value
//     })
//   }
//
//   handleSearch(e){
//     e.preventDefault()
//     let url = "http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=" + this.state.searchTerm
//     $.ajax({
//       url,
//       method: "GET",
//       dataType: "jsonp"
//     }).then((response) => {
//       this.setState({ searchedStock: response })
//     })
//   }
//
//   handleTrackStock(e){
//     let url = "http://localhost:3000/stocks"
//     $.ajax({
//       url,
//       method: "POST",
//       data: {
//         stock: {
//           name: this.state.searchedStock.Name,
//           symbol: this.state.searchedStock.Symbol
//         }
//       },
//       dataType: "json"
//     }).then((response) => {
//       this.props.handleTrackedState(response)
//     })
//   }
//
//   render() {
//     let searchResult = this.state.searchedStock.Name
//                           ? (<div className="search-results-item">
//                               {this.state.searchedStock.Name} ({this.state.searchedStock.Symbol})
//                               <button onClick={ (e) => this.handleTrackStock(e) } className="search-btn">Track Stock</button>
//                             </div>)
//                           : null
//     return (
//       <div className="search">
//         {this.state.searchedStock.name}
//         <h2>Search</h2>
//         <form onSubmit={ (e) => this.handleSearch(e) }>
//           <input onChange={ (e) => this.handleChange(e) } type="text" />
//           <input className="search-btn" type="submit" value="Search" />
//         </form>
//         <div className="search-results">
//           { searchResult }
//         </div>
//       </div>
//     );
//   }
// }

export default Questions;