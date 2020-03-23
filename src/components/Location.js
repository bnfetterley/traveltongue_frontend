import React, { Component } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../css/Location.css';



export default class Location extends Component {
    
    
    state = {
        currentDish: {},
        commentShow: false
    }
    
    handleOnClick = (e) => {
        console.log(e.target)
        this.setState({
            // currentDish: dish,
            commentShow: true
        })
    }

    
    
    render() {
        
        const location = this.props.locations && this.props.selectedPlace && this.props.locations.find(location => location.country === this.props.selectedPlace)
        const dishArray = this.props.dishes && location && this.props.dishes.filter(dish => dish.location_id === location.id) 
        const dishImages = dishArray && dishArray.map(dish => dish.image)
        const length = dishImages && dishImages.length
        
        // console.log(this.props, this.state)
        
        

        return (
            <div>
            <h1 className = "header"> Dishes from {location && location.country}</h1>

            <div class="wrap">

            <br></br>

            {dishArray && dishArray.map(dish =>  
            
            <div class="tile"> 
              <img src={dish.image}/>
              <div class="text">
              {/* <h1>{dish.name}</h1> */}
              <h2 class="animate-text">{dish.name}</h2>
              <p class="animate-text">{dish.description}
              <button onClick = {(e) => this.props.handleDishClick(e, dish)}> Leave a comment!</button>
              </p>
             
            <div class="dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              </div>
             </div>
             
             )}

             </div>

</div>
  
  
        )
    }
}
