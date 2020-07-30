import React, { useState } from 'react';
import '../css/DishForm.css';
import { Label, Select, Textarea } from '@rebass/forms';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions.js';

const DishForm = (props) => {
  const [signupForm, setSignupForm] = useState({
    username: '',
    password: '',
  });

  // Controlled form functions
  const handleChange = (e) =>
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });

  // initializing dispatch
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // const { history } = props;
    dispatch(userActions.newUserToDB(signupForm));
    // history.push('/');

    props.closeModal();
  };

  // Destructuring keys from our local state to use in the form
  const { username, password } = signupForm;

  // console.log(this.props)

  const divStyle = {
    display: props.displayModal ? 'block' : 'none',
  };

  // Sorting Locations for alphabetical dropdown
  const sortedLocations =
    props.locations &&
    props.locations.sort(function (a, b) {
      const aLower = a.country.toLowerCase();
      const bLower = b.country.toLowerCase();
      return aLower.localeCompare(bLower);
    });

  console.log(props);

  return (
    <div className="modal" onClick={props.closeModal} style={divStyle}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form
          onSubmit={(e) => props.handleDishSubmit(e)}
          action="action_page.php"
        >
          {/* <img className = "resize" src = {this.state.image && this.state.image}></img>  {this.state.location_name && this.state.name && <div>  <h1> {this.state.name} from {this.state.location_name} </h1></div>} */}

          <Label>Where is this dish from?</Label>
          <Select
            name="location_name"
            onChange={(event) => props.handleOnChange(event)}
            value={props.location_name}
            placeholder="Choose Country"
          >
            {props.locations &&
              sortedLocations.map((location) => (
                <option key={location.id}> {location.country} </option>
              ))}
          </Select>
          <br></br>

          <Label>What is the name of this dish?</Label>
          <Textarea
            className="nameInput"
            onChange={(event) => props.handleOnChange(event)}
            value={props.name}
            name="name"
          />
          <br></br>

          <Label>When and how is this dish usually eaten? Tell us more!!</Label>
          <Textarea
            onChange={(event) => props.handleOnChange(event)}
            value={props.description}
            name="description"
          />
          <br></br>

          <Label>Link us to a picture from google!</Label>
          <Textarea
            onChange={(event) => props.handleOnChange(event)}
            value={props.image}
            name="image"
          />
          <br></br>

          <button>
            {' '}
            <h1> Submit </h1>{' '}
          </button>
        </form>
        )
        <span className="close" onClick={props.closeModal}>
          {' '}
          X{' '}
        </span>
      </div>
    </div>
  );
};

export default DishForm;
