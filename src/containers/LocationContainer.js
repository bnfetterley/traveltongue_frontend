import React, { Component } from 'react'
import Location from '../components/Location'

export default class LocationContainer extends Component {
    render() {
        // console.log(this.props)
        return (
            <div id ="location">
           <Location currentUser = {this.props.currentUser} dishes = {this.props.dishes} locations = {this.props.locations} selectedPlace = {this.props.selectedPlace} />>
            </div>
        )
    }
}
