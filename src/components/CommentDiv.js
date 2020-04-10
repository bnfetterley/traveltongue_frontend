import React, { Component } from 'react'
import Button from '@bit/semantic-org.semantic-ui-react.button'
import Comment from '@bit/semantic-org.semantic-ui-react.comment'
import Form from '@bit/semantic-org.semantic-ui-react.form'
import Header from '@bit/semantic-org.semantic-ui-react.header'
import '../css/CommentDiv.css';

class CommentDiv extends Component {

  
  render() {
    console.log(this.props)
    
    return (
      <div className = "commentGroup">
   
   <Comment.Group className = "commentGroup">
    <Header as='h3' dividing>
      Would you try this? Comment below!
    </Header>

    <Comment className = "reply" >
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Bri</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>OMG! YUM!!!!!!!!!!!!!!!!!!!!!!! My fav :) :) </Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    {this.props.comments.map(comment => 
      <Comment className = "reply" >
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>{this.props.currentUsername}</Comment.Author>
        <Comment.Metadata>
          <div>{comment.created_at}</div>
        </Comment.Metadata>
        <Comment.Text>{comment.content} </Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
      )}

    <Form  onSubmit = {(e) => this.props.handleCommentSubmit(e)}reply>
      <Form.TextArea  className = "reply" value = {this.props.commentContent} onChange = {(e) => this.props.handleOnChange(e)} name = "commentContent"/>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
      <Button content='Add Reply' className = "reply" labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>





                
            </div>
        )
      }
    }
    const style = <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css'/>

export default CommentDiv
