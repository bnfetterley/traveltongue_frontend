import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Nav.css';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions';

const NavBar = (props) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userActions.logoutUser());
  };

  return (
    <div
      className="ui secondary  menu"
      // onClick={this.toggleCollapse}
    >
      <div>
        {' '}
        <h1 className="logo">TravelTongue</h1>{' '}
      </div>
      <a class="item">
        <Link to="/">Home</Link>
      </a>

      <a onClick={props.onClick} className="item">
        Become a Foodie
      </a>

      <a onClick={props.onLogInClick} className="item">
        LogIn
      </a>

      <a className="item">
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      </a>

      <a onClick={props.onClickDish} className="item">
        Add a Dish
      </a>
    </div>
  );
};

export default NavBar;
