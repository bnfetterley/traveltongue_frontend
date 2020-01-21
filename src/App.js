import React, { Component } from 'react'
import LocationContainer from './containers/LocationContainer'
import MapContainer from './components/Map'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link, NavLink, Redirect } from 'react-router-dom'
import './Map.css';
import NavBar from './NavBar'
import DishForm from './components/DishForm'
import SignUpModal from './components/SignUpModal'


export default class App extends Component {



    state = {
    locations: [],
    dishes: [],
    users: [],
    currentUserID: 1,
    selectedPlace: localStorage.getItem('selectedPlace'),
    dishModal: false,
    modal: false,
    username: "",
    password: "",
    location_id: "",
    location_name: "",
    name: "",
    description: "",
    image: ""
  }
  
  //GET FETCHES!!!!
  componentDidMount() {
    fetch(`http://localhost:3000/locations`)
    .then(resp => resp.json())
    .then(json_resp => 
      
      this.setState({
        locations: json_resp   
  }))

  
  fetch(`http://localhost:3000/dishes`)
  .then(resp => resp.json())
  .then(json_resp => 
    this.setState({
      dishes: json_resp
    }))


    
    fetch(`http://localhost:3000/users`)
    .then(resp => resp.json())
    .then(json_resp =>  
     this.setState({
    users: json_resp
     }))}

   // CALLBACKS FOR INFOWINDOW ON MAP
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  //SETS SELECTED COUNTRY IN STATE
  setSelectedPlace = (e, selectedPlace) => {
       console.log(e, selectedPlace)
       this.setState ({
         selectedPlace: selectedPlace.country
       })
       localStorage.setItem( 'selectedPlace', selectedPlace.country )
       window.location.href="/location"
  }

 //CALLBACK FOR SIGN UP MODAL 
   selectModal = (info) => {
     this.setState({modal: !this.state.modal}) // true/false toggle
   }

   //CALLBACK FOR DISH MODAL
   selectDishModal = (info) => {
    this.setState({dishModal: !this.state.dishModal}) // true/false toggle
  }

   //CALLBACK FOR UPDATING STATE FOR DISH FORM
   handleOnChange = (event) => {
     event.preventDefault()

     const countryID = event.target.name === 'location_name' && this.state.locations.find(location => location.country === event.target.value).id
     console.log(countryID)

     this.setState({
       [event.target.name]: event.target.value
     })

    //    if ([event.target.name] === "location_name")
    //  {
    //     this.setState({
    //       location_id:  countryID,
    //     })
    // }
    //  else {
    //  this.setState({
    //    [event.target.name]: event.target.value
    //  })
     console.log(this.state)
   }

   //CALLBACK TO POST A NEW DISH 
   handleDishSubmit = (e) => {
     e.preventDefault()
     fetch(`http://localhost:3000/dishes`, {
       method:'POST',
      headers: { 
          'Content-type': 'application/json',
          'accept': 'application/json'
      },
      body: JSON.stringify({
       name: this.state.name,
       description: this.state.description,
       image: this.state.image,
       user_id: this.state.currentUserID,
       location_id: this.state.locations.find(location => location.country === this.state.location_name).id
       })
     })
     .then(resp => resp.json())
     .then(json_resp => {

       console.log(json_resp)

      })}
   
   //CALLBACK FOR POST FETCH USER
   handleOnSubmit = (e) => {
     e.preventDefault()
    console.log("fetch hit")

     fetch(`http://localhost:3000/users`, {
       method:'POST',
      headers: { 
          'Content-type': 'application/json',
          'accept': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
       })
     })
     .then(resp => resp.json())
     .then(json_resp => {
       
      console.log(this.state)
    
    })
   }


  render() {
    console.log(this.state)

    const currentUser = this.state.users.find(user => user.id === this.state.currentUserID)

    return (
      <div>

          <BrowserRouter>
          <NavBar onClick = {this.selectModal} onClickDish = {this.selectDishModal} locations = {this.state.locations} /> 

          <SignUpModal 
          handleOnSubmit = {this.handleOnSubmit} 
          handleOnChange = {this.handleOnChange} 
          username = {this.state.username} 
          password = {this.state.password} 
          displayModal={this.state.modal} 
          closeModal={this.selectModal}/>
          

          <DishForm 
          locationName = {this.state.locationName} 
          handleOnChange = {this.handleOnChange} 
          handleDishSubmit = {this.handleDishSubmit} 
          locations = {this.state.locations}
          displayModal={this.state.dishModal} 
          closeModal={this.selectDishModal} 
          location_id={this.state.location_id}
          location_name = {this.state.location_name}
          name = {this.state.name}
          description = {this.state.description}
          image = {this.state.image}
          />

          <Switch> 

           <Route path= "/home" exact render={(props) => 

                  <MapContainer 
                  setSelectedPlace = {this.setSelectedPlace}  
                  handleNewDish = {this.handleNewDish} 
                  locations = {this.state.locations} 
                  dishes = {this.state.dishes} 
                  users = {this.state.users} 
                  currentUserID = {this.state.currentUserID}/>} />

           <Route path= "/location" exact  render={(props) => 

                <LocationContainer 
                currentUser = {currentUser} 
                selectedPlace = {this.state.selectedPlace} 
                locations = {this.state.locations} 
                dishes = {this.state.dishes}/>}/>

          </Switch> 
          </BrowserRouter>
        
      </div>
    )
  }
}



