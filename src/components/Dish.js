import React, { Component } from 'react'
import CommentDiv from './CommentDiv'
import '../Dish.css';

export default class Dish extends Component {
    render() {

        console.log(this.props)
        return (
            <div>
              <img id = "image" src={this.props.currentDish.image}/>

              <br></br>
             <CommentDiv currentUsername = {this.props.currentUsername}comments = {this.props.comments} handleCommentSubmit = {this.props.handleCommentSubmit} handleOnChange = {this.props.handleOnChange} commentContent = {this.props.commentContent} id = "comments"/>
            </div>
        )
    }
}
