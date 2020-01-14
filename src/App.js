import React, { Component } from 'react'
import LocationContainer from './containers/LocationContainer'
import MapContainer from './components/Map'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link, NavLink, Redirect } from 'react-router-dom'
import './Map.css';
import Nav from './Nav'





export default class App extends Component {


  render() {



    console.log(this.state)
    return (
      <div>

          <BrowserRouter>
           <Nav /> 
          <Switch> 
           <Route path= "/home" exact component={MapContainer} />
           <Route path= "/locations"  component={LocationContainer} />
          </Switch> 
          </BrowserRouter>
        
  
        
      </div>
    )
  }
}



