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



      let allQuestions = allLayerData.allVisibleLayers.map((layer, index) => {
        console.log(layer.data.properties.name)
        let pathName = `/map/${layer.data.properties.name}`
        return <div className="linkQuestion" key={index}>
          <Link to={pathName} className="question">
            {layer.data.properties.question}
          </Link>
        </div>

      })
      console.log(allQuestions)



      return (
        <div className="questionsContainer">
          <div className="questionsTitleContainer">
            <div className="questionsTitle">
              Questions
            </div>
          </div>

          <div className="questionList">
            {allQuestions}
          </div>


        </div>
      );
    }



}


export default Questions;
