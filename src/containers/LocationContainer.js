import React, { Component } from 'react';
import Location from '../components/Location';

export default class LocationContainer extends Component {
  render() {
    return (
      <div id="location">
        <Location
          currentUser={this.props.currentUser}
          dishes={this.props.dishes}
          locations={this.props.locations}
          selectedPlace={this.props.selectedPlace}
          handleDishClick={this.props.handleDishClick}
          currentDish={this.props.currentDish}
        />
        >
      </div>
    );
  }
}
