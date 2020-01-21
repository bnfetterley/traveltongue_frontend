import React, { Component } from 'react'
import Button from '@bit/semantic-org.semantic-ui-react.button'
import Comment from '@bit/semantic-org.semantic-ui-react.comment'
import Form from '@bit/semantic-org.semantic-ui-react.form'
import Header from '@bit/semantic-org.semantic-ui-react.header'
import '../CommentDiv.css';

class CommentDiv extends Component {

  // state = {
  //   content:

  // }
  
  render() {
    console.log(this.props)
    
    return (
      <div>
   
   <Comment.Group className = "commentGroup">
    <Header as='h3' dividing>
      Would you try this? Comment below!
    </Header>

    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>{this.props.currentUser && this.props.currentUser.username}</Comment.Author>
        <Comment.Metadata>
          <div>Today at 5:42PM</div>
        </Comment.Metadata>
        <Comment.Text>How artistic!</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>

    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Elliot Fu</Comment.Author>
        <Comment.Metadata>
          <div>Yesterday at 12:30AM</div>
        </Comment.Metadata>
        <Comment.Text>
          <p>This has been very useful for my research. Thanks as well!</p>
        </Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
      <Comment.Group>
        <br></br>
        <br></br>
        <Comment>
          <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
          <Comment.Content>
            <Comment.Author as='a'>Jenny Hess</Comment.Author>
            <Comment.Metadata>
              <div>Just now</div>
            </Comment.Metadata>
            <Comment.Text>Elliot you are always so right :)</Comment.Text>
            <Comment.Actions>
              <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </Comment>

    <Comment>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
      <Comment.Content>
        <Comment.Author as='a'>Joe Henderson</Comment.Author>
        <Comment.Metadata>
          <div>5 days ago</div>
        </Comment.Metadata>
        <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
        <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
      </Comment.Content>
    </Comment>
<br></br>
<br></br>
    <Form reply>
      <Form.TextArea />
      <Button content='Add Reply' className = "reply" labelPosition='left' icon='edit' primary />
    </Form>
  </Comment.Group>
)




                
            </div>
        )
      }
    }
    const style = <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css'/>

export default CommentDiv
