import React, { Component } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../Location.css';
import CommentDiv from './CommentDiv'


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
        
       
        function SampleNextArrow(props) {
            
            const { className, style, click } = props;
     
            return (
              <div
                className={className}
                style={{ ...style, display: "block" }}
                onClick={props.click}
              />
            );
          }
          
          function SamplePrevArrow(props) {
           
            const { className, style, click } = props;
            return (
              <div
                className={className}
                style={{ ...style, display: "block"}}
                onClick={props.click}
              />
            );
          }
            const settings = {
                className: "center",
                centerMode: true,
                infinite: true,
                centerPadding: "100px",
                slidesToShow: 1,
                speed: 200,
                variableWidth: false,
                variableHeight: false,
                dots: true,
                centerPadding: '100px',
                dotsClass: "slick-dots slick-thumb",
                centerMode: true,
                nextArrow: <SampleNextArrow click = {(e) => this.handleOnClick(e)}/>,
                prevArrow: <SamplePrevArrow onClick = {(e) => this.handleOnClick()}/>
              };

        return (
            <div className = "parent">
                
                <h2 className = "header" > Dishes from {this.props.selectedPlace}</h2> 
   { dishArray && 


        <Slider id = "slider" {...settings}>
           {dishArray.map(dish =>  <div className = "dish" key = {dish.id}>
        <img className="image fit-image" src={dish.image} />

        <h1 className = "dishName"> {dish.name} </h1>
        <p className = "dishName" > {dish.description}</p> 
        <p> <button className = "commentButton" onClick = {(e) => this.handleOnClick(e, dish)}> <h1>What do other's think of this dish?</h1></button> </p>
         </div>)}

         <SampleNextArrow click = {(e) => this.handleOnClick(e)}/>
         
        
     
     </Slider>}


     <br></br>
     <br></br>

     { this.state.commentShow &&
         <CommentDiv currentUser={this.props.currentUser} />
     }
                

            </div>
        )
    }
}
