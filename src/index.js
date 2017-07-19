import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import $ from "jquery";
import './index.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom"

ReactDOM.render(
// (
// <Router>
//   <div>
//   <Route exact path="/" component={App} />
//   <Route path="/events/:name" component={event} />
// </div>
// </Router>),
  <App className='map'/>,

  document.getElementById('root')

);
