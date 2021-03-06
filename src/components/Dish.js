import React, { Component } from 'react';
import CommentDiv from './CommentDiv';
import '../css/Dish.css';

export default class Dish extends Component {
  render() {
    console.log(this.props);
    return (
      <div id="dishInfo">
        <h1>{this.props.currentDish.name}</h1>
        <img alt="food" id="image" src={this.props.currentDish.image} />

        <br></br>
        <br></br>
        <p>{this.props.currentDish.description}</p>

        <h3>Would you try this? Have you tried this? Comment below!</h3>

        <CommentDiv
          username={this.props.username}
          id={this.props.id}
          comments={this.props.comments}
          handleCommentSubmit={this.props.handleCommentSubmit}
          handleOnChange={this.props.handleOnChange}
          commentContent={this.props.commentContent}
          username={this.props.username}
        />
      </div>
    );
  }
}
