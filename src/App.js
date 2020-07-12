import React, { Component } from 'react';
import LocationContainer from './containers/LocationContainer';
import MapContainer from './components/Map';
import './css/App.css';
import { Route, Switch, withRouter } from 'react-router-dom';
import './Map.css';
import NavBar from './components/NavBar';
import DishForm from './components/DishForm';
import SignUpModal from './components/SignUpModal';
import 'semantic-ui-css/semantic.min.css';
import Dish from './components/Dish';
import Login from './components/Login';

class App extends Component {
  state = {
    locations: [],
    dishes: [],
    users: [],
    comments: [],
    selectedPlace: '',

    dishModal: false,
    logInModal: false,
    modal: false,
    login: false,

    username: '',
    password: '',
    location_id: '',
    location_name: '',
    name: '',
    description: '',
    image: '',

    searchValue: '',

    searchResults: [],

    currentDish: '',
    commentContent: '',
  };

  //GET FETCHES!!!!
  componentDidMount() {
    fetch(`https://traveltongue-backend.herokuapp.com/locations`)
      .then((resp) => resp.json())
      .then((json_resp) =>
        this.setState({
          locations: json_resp,
        })
      );
    console.log('fetch hit');

    fetch(`https://traveltongue-backend.herokuapp.com/dishes`)
      .then((resp) => resp.json())
      .then((json_resp) =>
        this.setState({
          dishes: json_resp,
        })
      );

    fetch(`https://traveltongue-backend.herokuapp.com/users`)
      .then((resp) => resp.json())
      .then((json_resp) =>
        this.setState({
          users: json_resp,
        })
      );

    fetch(`https://traveltongue-backend.herokuapp.com/comments`)
      .then((resp) => resp.json())
      .then((json_resp) =>
        this.setState({
          comments: json_resp,
        })
      );

    this.setState({
      currentDish: JSON.parse(localStorage.getItem('currentDish')),
    });
  }

  // CALLBACKS FOR INFOWINDOW ON MAP
  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  //SETS SELECTED COUNTRY IN STATE
  setSelectedPlace = (e, selectedPlace) => {
    console.log(e, selectedPlace);
    this.setState({
      selectedPlace: selectedPlace.country,
    });
    //  localStorage.setItem( 'selectedPlace', selectedPlace.country )
    this.props.history.push('/location');
  };

  //CALLBACK FOR SIGN UP MODAL
  selectModal = (info) => {
    this.setState({
      modal: !this.state.modal,
      login: !this.state.login,
    }); // true/false toggle
  };

  selectLogInModal = (info) => {
    this.setState({
      logInModal: !this.state.logInModal,
      // login: !this.state.login
    }); // true/false toggle
  };

  //CALLBACK FOR DISH MODAL
  selectDishModal = (info) => {
    this.setState({ dishModal: !this.state.dishModal }); // true/false toggle
  };

  //CALLBACK FOR UPDATING STATE FOR DISH FORM
  handleOnChange = (event) => {
    event.preventDefault();

    const countryID =
      event.target.name === 'location_name' &&
      this.state.locations.find(
        (location) => location.country === event.target.value
      ).id;
    console.log(countryID);

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  //CALLBACK TO POST A NEW DISH
  handleDishSubmit = (e) => {
    e.preventDefault();
    fetch(`https://traveltongue-backend.herokuapp.com/dishes`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        image: this.state.image,
        user_id: this.props.login.id,
        location_id:
          this.state.location_name &&
          this.state.locations.find(
            (location) => location.country === this.state.location_name
          ).id,
      }),
    })
      .then((resp) => resp.json())
      .then((json_resp) => {
        this.setState({
          name: '',
          description: '',
          image: '',
          location_id: '',
        });
        console.log('fetch hit', json_resp);
        this.selectDishModal();
        window.location.reload();
      });
  };

  //RENDER LOGIN info
  renderLogin = (event) => {
    this.setState({
      login: !this.state.login,
    });
  };

  //CALLBACK FOR UPDATE STATE FOR SIGNUP
  handleUserChange = (event) => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  //CALLBACK FOR SEARCH ONCHANGE
  handleSearchOnChange = (event) => {
    this.setState({
      searchValue: event.target.value,
      searchResults: this.state.locations.filter((location) =>
        location.country.toLowerCase().includes(event.target.value)
      ),
    });
  };

  //CALLBACK FOR DISH ON CLICK
  handleDishClick = (e, dish) => {
    fetch(`https://traveltongue-backend.herokuapp.com/dishes/${dish.id}`)
      .then((resp) => resp.json())
      .then((json_resp) => {
        localStorage.setItem('currentDish', JSON.stringify(dish));
        let dishSet = JSON.parse(localStorage.getItem('currentDish'));
        console.log(json_resp, dishSet);
        this.setState({
          currentDish: dishSet,
        });
      });
    this.props.history.push(`/dish/${dish.id}`);
  };

  //CALLBACK FOR COMMENT SUBMIT
  handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.commentContent, this.state.currentDish.id);
    fetch(`https://traveltongue-backend.herokuapp.com/comments`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        content: this.state.commentContent,
        user_id: this.state.currentUserID,
        dish_id: this.state.currentDish.id,
      }),
    })
      .then((resp) => resp.json())
      .then((json_resp) => {
        this.setState({
          comments: [...this.state.comments, json_resp],
          commentContent: '',
        });
      });
  };

  render() {
    console.log(this.state, this.props);

    const currentUser = this.state.users.find(
      (user) => user.id === this.state.currentUserID
    );

    return (
      <div>
        <NavBar
          onClick={this.selectModal}
          onLogInClick={this.selectLogInModal}
          onClickDish={this.selectDishModal}
          locations={this.state.locations}
          handleSearchOnChange={this.handleSearchOnChange}
          searchValue={this.state.searchValue}
          searchResults={this.state.searchResults}
          setSelectedPlace={this.setSelectedPlace}
        />

        <SignUpModal
          handleOnSubmit={this.handleOnSubmit}
          handleOnChange={this.handleOnChange}
          username={this.state.username}
          password={this.state.password}
          displayModal={this.state.modal}
          closeModal={this.selectModal}
          renderLogin={this.renderLogin}
          login={this.state.login}
        />

        <DishForm
          locationName={this.state.locationName}
          handleOnChange={this.handleOnChange}
          handleDishSubmit={this.handleDishSubmit}
          locations={this.state.locations}
          displayModal={this.state.dishModal}
          closeModal={this.selectDishModal}
          location_id={this.state.location_id}
          location_name={this.state.location_name}
          name={this.state.name}
          description={this.state.description}
          image={this.state.image}
        />

        <Login
          displayModal={this.state.logInModal}
          closeModal={this.selectLogInModal}
        />

        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <MapContainer
                setSelectedPlace={this.setSelectedPlace}
                handleNewDish={this.handleNewDish}
                locations={this.state.locations}
                dishes={this.state.dishes}
                users={this.state.users}
                currentUserID={this.state.currentUserID}
              />
            )}
          />

          <Route
            path="/location"
            exact
            render={(props) => (
              <LocationContainer
                currentUser={currentUser}
                selectedPlace={this.state.selectedPlace}
                locations={this.state.locations}
                dishes={this.state.dishes}
                handleDishClick={this.handleDishClick}
                currentDish={this.state.currentDish}
              />
            )}
          />

          <Route
            path="/dish"
            render={(props) => (
              <Dish
                currentDish={this.state.currentDish}
                handleOnChange={this.handleOnChange}
                commentContent={this.state.commentContent}
                handleCommentSubmit={this.handleCommentSubmit}
                comments={this.state.comments.filter(
                  (comment) => comment.dish_id === this.state.currentDish.id
                )}
                currentUsername={this.state.currentUsername}
                users={this.state.users}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
