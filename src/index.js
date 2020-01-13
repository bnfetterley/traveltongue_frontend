import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MapContainer from './components/Map'
import { BrowserRouter } from "react-router-dom"
import * as serviceWorker from './serviceWorker';


ReactDOM.render(

<App />, document.getElementById('root'));


ReactDOM.render(<BrowserRouter>

<MapContainer /></BrowserRouter>, document.getElementById("root"));
// ReactDom.render(<ComponentName/>, document.getElementById("showhideControlDiv "))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
