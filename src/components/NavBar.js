import React, { Component, useState, useEffect  } from 'react'
import { Link } from 'react-router-dom'
import '../css/Nav.css';
import 'semantic-ui-css/semantic.min.css'
import { useSelector, useDispatch } from 'react-redux'
import userActions from '../redux/actions';

const NavBar = (props) => {
    
        const dispatch = useDispatch();
        const handleLogout = () => {
        dispatch(userActions.logoutUser());
        };
   


        return (

          <div class="ui secondary  menu"   
          // onClick={this.toggleCollapse}
          
          >
          <div> <h1 className = "logo">TravelTongue</h1>    </div>
                <a class="item">
                <Link to="/">Home</Link>
                </a>
                

                <a onClick={ props.onClick } class="item" >
                   Become a Foodie 
                 </a>

                 <a onClick={ props.onLogInClick } class="item">
                   LogIn
                 </a>
                 

                 <a class="item">
                 <Link to="/" onClick={handleLogout}>Logout</Link>
                 </a>

                 <a onClick={ props.onClickDish} class="item">
                    Add a Dish
              
                 </a>


                  </div>
    
        )
    }


export default NavBar