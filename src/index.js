import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home';
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

<Router>
  <div className ="mapContainer">






    <main className="mapContainer">
      <Route exact path="/" component={Home} />
      {/* render={() => <Questions className='map'/>}/> */}
      <Route exact path="/questions" component={Questions} />
      {/* render={() => <Questions className='map'/>}/> */}
      <Route path="/map" component={App} />
      {/* render={() => <App className='map'/>}/> */}
    </main>
  </div>
</Router>
,
document.getElementById('root')



);
