import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import MapStyle from '../MapStyle';
import ReactDOM from 'react-dom';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  }

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  onInfoWindowOpen(props, e) {
    const button = (
      <button
        id="infoButton"
        onClick={(e) => {
          this.props.setSelectedPlace(e, this.state.selectedPlace);
        }}
      >
        {' '}
        See more dishes from this country!
      </button>
    );
    ReactDOM.render(
      React.Children.only(button),
      document.getElementById('iwc')
    );
  }

  render() {
    console.log(this.state, this.props);

    const style = {
      width: '20',
      height: '20',
    };

    if (!this.props.google) {
      return <div>Loading...</div>;
    }
    const dishIDArray = this.props.dishes.map((dish) => dish.location_id);
    const locationsArray = this.props.locations.filter((location) =>
      dishIDArray.includes(location.id)
    );

    return (
      <div id="map-div">
        <Map
          styles={MapStyle}
          google={this.props.google}
          zoom={3.3}
          initialCenter={{
            lat: 26.8206,
            lng: 30.8025,
          }}
        >
          {locationsArray.map((location) => (
            <Marker
              key={location.id}
              onClick={this.onMarkerClick}
              icon={{
                url:
                  this.props.dishes &&
                  this.props.dishes.find(
                    (dish) => dish.location_id === location.id
                  ).image,
                anchor: new this.props.google.maps.Point(10, 10),
                scaledSize: new this.props.google.maps.Size(35, 35),
              }}
              //WHAT DOES THIS DO?
              title={'The marker`s title will appear as a tooltip.'}
              position={{ lat: location.latitude, lng: location.longitude }}
              id={location.id}
              name={
                this.props.dishes &&
                this.props.dishes.find(
                  (dish) => dish.location_id === location.id
                ).name
              }
              country={location.country}
              description={
                this.props.dishes &&
                this.props.dishes.find(
                  (dish) => dish.location_id === location.id
                ).description
              }
            />
          ))}

          {/* <SearchForm /> */}

          <InfoWindow
            className="infoWindow"
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onOpen={(e) => {
              this.onInfoWindowOpen(this.props, e);
            }}
          >
            <div>
              <h1>
                {this.state.selectedPlace.name} from{' '}
                {this.state.selectedPlace.country}
              </h1>
              <img
                src={
                  this.state.selectedPlace.icon &&
                  this.state.selectedPlace.icon.url
                }
                className="image"
              ></img>
              <p>{this.state.selectedPlace.description}</p>
            </div>

            <div id="iwc"></div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

const api_key = process.env.REACT_APP_API_KEY;

export default GoogleApiWrapper({
  apiKey: api_key,
  v: '3.30',
})(MapContainer);
