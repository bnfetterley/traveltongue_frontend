import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import LocationContainer from '../containers/LocationContainer'
import '../Map.css';
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import MapStyle from '../MapStyle'
import Nav from '../Nav'

import { BrowserRouter, Route, Switch, Link, NavLink, Redirect } from 'react-router-dom'

export class MapContainer extends Component {

  // componentWillMount() {
  //   this.map = this.context[Map]
  //   this.controlDiv = document.createElement('div')
  //   // this.map.controls[this.props.position].push(this.controlDiv)
  // }
  // componentWillUnmount() {
  //   this.map.controls[this.props.position].removeAt(this.divIndex)
  // }
  
  
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      locations: [],
      dishes: null,
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


    // return createPortal(this.props.children, this.controlDiv)

    console.log(this.state);

    const style = {
      width: '20',
      height: '20'
    }

    if (!this.props.google) {
      return <div>Loading...</div>;
    }
   
   

    
    

    return (

      
      
     


      <div id = "map-div" >
       
        <Map styles = {MapStyle} google={this.props.google} zoom={2.6} initialCenter={{
            lat: 26.8206,
            lng: 30.8025
          }} 

          >
            

           <Nav /> 
          <BrowserRouter>
          <Switch> 
           <Route path= "/home" component={MapContainer} render={(props) => <MapContainer />}/>
           <Route path= "/locations"  component={LocationContainer} render={(props) => <LocationContainer /> }/>
          </Switch> 
          </BrowserRouter>
    

           {this.state.locations.map(location => 
           
      
           <Marker
            onClick={this.onMarkerClick}
            icon={{ 
    
              url:  this.state.dishes && this.state.dishes.find(dish => dish.location_id === location.id).image ,
              anchor: new this.props.google.maps.Point(10, 10),
              scaledSize: new this.props.google.maps.Size(35, 35)
            }}

            title={'The marker`s title will appear as a tooltip.'}
            position={{lat: location.latitude, lng: location.longitude}}

            name={ this.state.dishes && this.state.dishes.find(dish => dish.location_id === location.id).name}

            country = { location.country}

            description = { this.state.dishes && this.state.dishes.find(dish => dish.location_id === location.id).description}
            
    />)}
         
         <div id="cover">
  <form method="get" action="">
    <div class="tb">
      <div class="td"><input type="text" placeholder="Search" required></input></div>
      <div class="td" id="s-cover">
        <button type="submit">
          <div id="s-circle"></div>
          <span></span>
        </button>
      </div>
    </div>
  </form>
</div>

    {/* <div name = "cover-div">
      <h1> hi </h1>
          </div>

      <div></div> */}
        
           
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name} from {this.state.selectedPlace.country}</h1>  
              <img src = {this.state.selectedPlace.icon && this.state.selectedPlace.icon.url} className="image fit-image" ></img>
          <p>{this.state.selectedPlace.description}</p>
        
              
            </div>
          </InfoWindow>
        </Map>
      </div>

      
    );
  }
} 

