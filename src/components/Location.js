import React, { Component } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/Location.css';

export default class Location extends Component {
  state = {
    currentDish: {},
    commentShow: false,
  };

  handleOnClick = (e) => {
    console.log(e.target);
    this.setState({
      // currentDish: dish,
      commentShow: true,
    });
  };

  render() {
    const location =
      this.props.locations &&
      this.props.selectedPlace &&
      this.props.locations.find(
        (location) => location.country === this.props.selectedPlace
      );
    const dishArray =
      this.props.dishes &&
      location &&
      this.props.dishes.filter((dish) => dish.location_id === location.id);

    return (
      <div>
        <h1 className="header"> Dishes from {location && location.country}</h1>

        <div className="wrap">
          <br></br>

          {dishArray &&
            dishArray.map((dish) => (
              <div className="tile">
                <img alt="dish" src={dish.image} />
                <div className="text">
                  {/* <h1>{dish.name}</h1> */}
                  <h2 className="animate-text">{dish.name}</h2>
                  <p className="animate-text">
                    {dish.description}
                    <button
                      onClick={(e) => this.props.handleDishClick(e, dish)}
                    >
                      {' '}
                      Leave a comment!
                    </button>
                  </p>

                  <div className="dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
