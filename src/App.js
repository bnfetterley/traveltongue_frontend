import React, { Component, useState, useEffect  } from 'react'
import LocationContainer from './containers/LocationContainer'
import MapContainer from './components/Map'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link, NavLink, Redirect, withRouter } from 'react-router-dom'
import './Map.css';
import NavBar from './NavBar'
import DishForm from './components/DishForm'
import SignUpModal from './components/SignUpModal'
import 'semantic-ui-css/semantic.min.css'
import Dish from './components/Dish'
import Login from './components/Login'


class App extends Component {

    state = {
    locations: [],
    dishes: [],
    users: [],
    comments: [],
    currentUserID: 4,
    currentUsername: "Katie",
    selectedPlace: "",
    dishModal: false,
    modal: false,
    username: "",
    password: "",
    location_id: "",
    location_name: "",
    name: "",
    description: "",
    image: "",
    searchValue: "",
    searchResults: [],
    currentDish: "",
    commentContent:"",
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
      }))
    
    fetch(`http://localhost:3000/comments`)
    .then(resp => resp.json())
    .then(json_resp =>  
     this.setState({
    comments: json_resp
     }))
    
    }

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
       this.props.history.push("/location")
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

       this.setState({
         name: "",
         description: "",
         image: "",
         location_id: ""
       })

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
       this.setState({
         currentUsername: this.state.username,
         currentUserID: json_resp.id
       })
    
    })
   }
   
   //CALLBACK FOR SEARCH ONCHANGE
   handleSearchOnChange = (event) => {
     this.setState({
      searchValue: (event.target.value),
      searchResults: this.state.locations.filter(location =>
        location.country.toLowerCase().includes(event.target.value))
      })
  
    }

    //CALLBACK FOR DISH ON CLICK
    handleDishClick = (e, dish) => {
      console.log(dish)
      this.setState({
        currentDish: dish
      })
      localStorage.setItem( 'currentDish', dish )
      this.props.history.push("/dish")
  }

  //CALLBACK FOR COMMENT SUBMIT
  handleCommentSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.commentContent, this.state.currentDish.id)
    fetch(`http://localhost:3000/comments`, {
      method:'POST',
     headers: { 
         'Content-type': 'application/json',
         'accept': 'application/json'
     },
     body: JSON.stringify({
      content: this.state.commentContent,
      user_id: this.state.currentUserID,
      dish_id: this.state.currentDish.id
      })
    })
    .then(resp => resp.json())
    .then(json_resp => {

    this.setState({
      comments: [...this.state.comments, json_resp]
    })

     })}
    
    render() {
      console.log(this.state)

    const currentUser = this.state.users.find(user => user.id === this.state.currentUserID)

    return (
      <div>

 
          <NavBar 
          onClick = {this.selectModal} 
          onClickDish = {this.selectDishModal} 
          locations = {this.state.locations} 
          handleSearchOnChange = {this.handleSearchOnChange}
          searchValue = {this.state.searchValue}
          searchResults = {this.state.searchResults}
          setSelectedPlace = {this.setSelectedPlace} 
          /> 

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
                dishes = {this.state.dishes}
                handleDishClick = {this.handleDishClick}
                currentDish = {this.state.currentDish}
                />
                }/>

            <Route path = "/dish" render={(props) => 
              <Dish
              currentDish = {this.state.currentDish}
              handleOnChange = {this.handleOnChange}
              commentContent = {this.state.commentContent}
              handleCommentSubmit = {this.handleCommentSubmit}
              comments = {this.state.comments.filter(comment => comment.dish_id === this.state.currentDish.id)}
              currentUsername = {this.state.currentUsername}
              users = {this.state.users}
              />
            }/>

          </Switch> 
     
        
      </div>
    )
  }
}


export default withRouter(App)


