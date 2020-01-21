import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css';
import 'semantic-ui-css/semantic.min.css'
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
        this.onMarkerClick = this.onMarkerClick.bind(this);
        
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
    
    onMarkerClick(props, marker, e) {
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
    }
 
  
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  //Modal Open Change State
  open = () => {
    this.setState({ 
      showModal: true,
  
    });
  }

  handleOnChange = (event) => {
      const value = event.target.value
      const items = this.props.locations
      let suggestions = []
      if (value.length > 0) {
          const regex = new RegExp(`^${value}`, 'i')
          suggestions = items.sort().filter(v => regex.test(v));
        }
        if (value.length === 0){
            this.setState(() => ({
                suggestions: [],
            }));
        }
        this.setState(() => ({ suggestions  }))
    }
    
    renderSuggestions () {
        const {suggestions} = this.state;
        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul>
        {suggestions.map((item )=> <li> {item}</li>)}
        </ul>
        )
    }
    

    loginModalRef = ({handleShow}) => {
      this.showModal = handleShow;
    }
   
    onLoginClick = () => {
     this.loginModalRef();
    }
   
    render() {
        
    // (function ($) {
    //     $(document).ready(function(){
      
    //         $('.ui.search')
    //         .search({
    //         source: this.props.locations
    //         })
      
    //     });
    //   })(jquery)
      
    
    ;
    //   const content = this.props.locations


        // console.log(this.state, this.props)

        return (

          <div class="ui secondary  menu"   onClick={this.toggleCollapse}>
                <a class="item">
                <Link to="/home">Home</Link>
                </a>
                
                <a onClick={ this.props.onClick } class="item">
                   Become a Foodie 
                 </a>

                 <a onClick={ this.props.onClickDish}class="item">
                    Add a Dish
                 {/* <DishForm handleNewDish = {this.props.handleNewDish} locations = {this.props.locations} show={this.state.showModal}  >  <div id = "dishbutton" onClick={() => this.open()}>Add a Dish!</div> </DishForm> */}
              
                 </a>

              
            
                
                

           
 
                 {/* <div class="right menu"> */}
                    {/* <div class="item">
                    <div class="ui search">
                        <div class="ui icon input">
                         <input 
                            onChange = {(event) => this.handleOnChange(event)} type="text" value = {this.state.search} placeholder="Search by Country"/>
                     <i class="search link icon"></i>
                     <div class="results">
                         <ul>
                             {this.renderSuggestions()}
                             </ul>)
                     </div>
                    </div> */}

                {/* </div>
                </div>
                     <a class="ui item">
                     <Link to="/signUp">Become a Foodie!</Link>
                      </a>
                </div> */}

                
            </div>
    
        )
    }
}
