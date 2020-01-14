import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import LocationContainer from '../containers/LocationContainer'
import '../Map.css';
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import MapStyle from '../MapStyle'



import { BrowserRouter, Route, Switch, Link, NavLink, Redirect } from 'react-router-dom'
import SearchForm from "./SearchForm";

export class MapContainer extends Component {
  
      constructor(props) {
        super(props);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        
        this.state = {
          showingInfoWindow: false,
          activeMarker: {},
          selectedPlace: {},
          locations: [],
          dishes: [],
          users: []
        };
      }
      
      componentDidMount() {
        fetch(`http://localhost:3000/locations`)
        .then(resp => resp.json())
        .then(json_resp => 
          
          this.setState({
            locations: json_resp
            
      })
      
      )
      
      fetch(`http://localhost:3000/dishes`)
      .then(resp => resp.json())
      .then(json_resp => 
        
        this.setState({
          dishes: json_resp
          
        })
        
        
        )
        
        fetch(`http://localhost:3000/users`)
        .then(resp => resp.json())
        .then(json_resp => 
          
      this.setState({
        users: json_resp
        
      })
      
      
      )
    }
    
    onMarkerClick(props, marker, e) {
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
      });
    }
    
    handleCountryShowClick(event) {
    this.setState({
      
    })
  }
  
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  
  
  render() {
 

    console.log(this.state);
    
    //this doesn't work?
    const style = {
      width: '20',
      height: '20'
    }

    //what does this do??
    
    if (!this.props.google) {
      return <div>Loading...</div>;
    }
    const dishIDArray = this.state.dishes.map(dish => dish.location_id)
   
    const locationsArray = this.state.locations.filter(location => dishIDArray.includes(location.id))

    // const locationsArray = []


    console.log( locationsArray)
    return (
    
      <div id = "map-div" >
       
        <Map styles = {MapStyle} google={this.props.google} zoom={3.3} initialCenter={{
          lat: 26.8206,
          lng: 30.8025
        }} 
        >

  

           {locationsArray.map(location => 
           
           <Marker
           key = {location.id}
           onClick={this.onMarkerClick}
           icon={{ 
             url: this.state.dishes && this.state.dishes.find(dish => dish.location_id === location.id).image ,
             anchor: new this.props.google.maps.Point(10, 10),
             scaledSize: new this.props.google.maps.Size(35, 35)
            }}
            //WHAT DOES THIS DO?
            title={'The marker`s title will appear as a tooltip.'}
            position={{lat: location.latitude, lng: location.longitude}}
            name={this.state.dishes && this.state.dishes.find(dish => dish.location_id === location.id).name}
            country = {location.country}
            description = { this.state.dishes && this.state.dishes.find(dish => dish.location_id === location.id).description}
            />)}
         
           <SearchForm />
           
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            >
            <div>
              <h1>{this.state.selectedPlace.name} from {this.state.selectedPlace.country}</h1>  
              <img src = {this.state.selectedPlace.icon && this.state.selectedPlace.icon.url} className="image fit-image" ></img>
              <p>{this.state.selectedPlace.description}</p>
              <button text = "Add a Dish to this country"><h1>Add a Dish to this country</h1></button>
            </div>
          </InfoWindow>
        </Map>
      </div>


);
}
} 

const api_key = process.env.REACT_APP_API_KEY

export default GoogleApiWrapper({
  apiKey: api_key,
  v: "3.30"
})(MapContainer);
