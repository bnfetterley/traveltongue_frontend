import React, { Component, useState, useEffect  } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css';
import 'semantic-ui-css/semantic.min.css'
// import { Search } from 'semantic-react'
import DishForm from './components/DishForm'
import ReactDOM from 'react-dom';
import PlacesAutocomplete from 'react-places-autocomplete'
import $ from 'jquery';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
    MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact"
import {
  Navbar, 
  NavItem,
  Nav,
  Button
} from 'react-bootstrap'


export default class NavBar extends Component {

    constructor(props) {
        super(props);
        // this.onMarkerClick = this.onMarkerClick.bind(this);
        
        this.state = {
          showingInfoWindow: false,
          activeMarker: {},
          search: "",
          suggestions: [],
          showModal: false
        };
      }

      toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
        }
    
   
    render() {
        
  const searchResults = this.props.searchResults || []

        return (

          <div class="ui secondary  menu"   onClick={this.toggleCollapse}>
                <a class="item">
                <Link to="/">Home</Link>
                </a>
                
                <div onClick={ this.props.onClick } class="left item">
                   Become a Foodie 
                 </div>

                 <a onClick={ this.props.onClickDish}class= "left item">
                    Add a Dish
              
                 </a>

                  <div class="center item"> <h1 className = "logo">TravelTongue</h1>    </div>

                  </div>
    
        )
    }
}
