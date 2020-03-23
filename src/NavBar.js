import React, { Component, useState, useEffect  } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css';
import 'semantic-ui-css/semantic.min.css'
import { useSelector, useDispatch } from 'react-redux'
import userActions from './redux/actions';

const NavBar = (props) => {
    
        const dispatch = useDispatch();
        const handleLogout = () => {
        dispatch(userActions.logoutUser());
        };
   
   
        

        return (

          <div class="ui secondary  menu"   
          // onClick={this.toggleCollapse}
          
          >
                <a class="item">
                <Link to="/">Home</Link>
                </a>
                

                <div onClick={ props.onClick } class="left item">
                   Become a Foodie 
                 </div>

                 <div onClick={ props.onLogInClick } class="left item">
                   LogIn
                 </div>

                 <Link to="/" onClick={handleLogout}>Logout</Link>
                

                 <a onClick={ props.onClickDish}class= "left item">
                    Add a Dish
              
                 </a>

                  <div class="center item"> <h1 className = "logo">TravelTongue</h1>    </div>

                  </div>
    
        )
    }


export default NavBar