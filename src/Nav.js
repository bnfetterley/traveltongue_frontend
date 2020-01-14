import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link, NavLink, Redirect } from 'react-router-dom'
import './Nav.css';

export default class Nav extends Component {
    render() {
        return (
            
    <div id = "nav">
   
      <Link to="/home"> Home </Link>
      <Link to="/locations"> Locations</Link>
      <Link to="/dishes"> Add a Dish </Link>
    
    </div>
            
        )
    }
}
