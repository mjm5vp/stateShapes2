import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Questions from './Questions';
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
/* <Router>
  <Route exact path='/' component={App} />
</Router>  */


//<App className='map'/>,
//  document.getElementById('root')



<Router>
  <div className ="mapContainer">

    {/* <div className="testLink"><Link to="/questions">Questions</Link></div>
    <div className="testLink"><Link to="/map">Map</Link></div> */}




    <main className="mapContainer">
      <Route path="/questions" render={() => <Questions className='map'/>}/>
      <Route path="/map" render={() => <App className='map'/>}/>
    </main>
  </div>
</Router>
,
document.getElementById('root')



);
