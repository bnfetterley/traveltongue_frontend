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
    
  //   onMarkerClick(props, marker, e) {
  //     this.setState({
  //       selectedPlace: props,
  //       activeMarker: marker,
  //       showingInfoWindow: true
  //     });
  //   }
 
  
  // onClose = props => {
  //   if (this.state.showingInfoWindow) {
  //     this.setState({
  //       showingInfoWindow: false,
  //       activeMarker: null
  //     });
  //   }
  // };

  //Modal Open Change State
  // open = () => {
  //   this.setState({ 
  //     showModal: true,
  
  //   });
  // }

  // handleOnChange = (event) => {
  //     const value = event.target.value
  //     const items = this.props.locations
  //     let suggestions = []
  //     if (value.length > 0) {
  //         const regex = new RegExp(`^${value}`, 'i')
  //         suggestions = items.sort().filter(v => regex.test(v));
  //       }
  //       if (value.length === 0){
  //           this.setState(() => ({
  //               suggestions: [],
  //           }));
  //       }
  //       this.setState(() => ({ suggestions  }))
  //   }
    
  //   renderSuggestions () {
  //       const {suggestions} = this.state;
  //       if (suggestions.length === 0) {
  //           return null;
  //       }
  //       return (
  //           <ul>
  //       {suggestions.map((item )=> <li> {item}</li>)}
  //       </ul>
  //       )
  //   }
    
   
    render() {
        
  const searchResults = this.props.searchResults || []

        return (

          <div class="ui secondary  menu"   onClick={this.toggleCollapse}>
                <a class="item">
                <Link to="/home">Home</Link>
                </a>
                
                <div onClick={ this.props.onClick } class="left item">
                   Become a Foodie 
                 </div>

                 <a onClick={ this.props.onClickDish}class= "left item">
                    Add a Dish
              
                 </a>

                 {/* <a class= "left item">
                 <div id="cover">
  <form method="get" action="">
    <div class="tb">
      <div class="td">
        <input type="text"  value = {this.props.searchValue} name = "searchValue" onChange = {(e) =>this.props.handleSearchOnChange(e)}  placeholder="Search" required/>

        </div>

        <ul id = "searchResults" class="results">

                          {searchResults.map(result =>
                          {return <li onClick = {(event) => this.props.setSelectedPlace(event, result)}id = "searchResults" className="results">{result.country}</li> }
                            )}
                        </ul>
      <div class="td" id="s-cover">
        <button type="submit">
          <div id="s-circle"></div>
          <span></span>
        </button>
      </div>
    </div>
  </form>
</div>
</a> */}





                  <div class="center item"> <h1 className = "logo">TravelTongue</h1>    </div>
            
                  {/* <div size="3" id = "search" className = "ui category search">

                       <div size="3" class="ui icon input">
                           <input size="3" class="prompt" type="text" value = {this.props.searchValue} name = "searchValue" onChange = {(e) =>this.props.handleSearchOnChange(e)} placeholder="Search..."/>
                                    <i class="search icon"></i>
                            </div>
                         
                        <ul id = "searchResults" class="results">

                          {searchResults.map(result =>
                          {return <li id = "searchResults" className="results">{result.country}</li> }
                            )}
                        </ul>
                        
                       </div> */}



                       














                  </div>
    
        )
    }
}
