import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'
import Home from './components/Homepage'
import Results from './components/Results'
import Details from './components/Details'
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch, Link} from 'react-router-dom';


ReactDOM.render(
    
  <BrowserRouter>
     <App />
     <Switch>
      <Link path='/' exact component={Home}/>
      <Link path='/results' component={Results}/>
      <Link path='/details' component={Details}/>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
