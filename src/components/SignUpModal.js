import React, { Component, useState } from 'react'
import '../css/SignUpModal.css';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions.js';



const SignUpModal = props => {
  
  // Setting up local state using the useState hook
  const [signupForm, setSignupForm] = useState({
    username: '',
    password: ''
     })
  
  
    // Controlled form functions
    const handleChange = e =>
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });


          const divStyle = { 
            display: props.displayModal ? 'block' : 'none'
       };
       function closeModal(e) {
          e.stopPropagation()
          props.closeModal()
          
        }
        
                // initializing dispatch
          const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    // const { history } = props;
    dispatch(userActions.newUserToDB(signupForm));
    // history.push('/');

    props.closeModal()

  };

  // Destructuring keys from our local state to use in the form
  const { username, password } = signupForm;

        // console.log(this.props)

        return (

           
          
          
          //SIGNUPMODAL 
          <div className="container">
          <div className="modal" onClick={ closeModal } style={divStyle}> 
          <div className="modal-content"   onClick={ e => e.stopPropagation()} >
          
          <form onSubmit = {(e) => handleSubmit(e)} action="action_page.php" >
           <div className="container">
           <h1>Join the global foodie fam!</h1>
            <p>Please fill in this form to create an account.</p>
           <hr/>

            <label for="username"><b>Username</b></label>
            <input name = "username" onChange = {(e) => handleChange(e)} value = {username} type="textarea" placeholder="Enter Username" required/>
             <br></br>
             <br></br>
            <label for="psw"><b>Password</b></label>
            <input name="password" onChange = {(e) => handleChange(e)}  value = {password} type="password" placeholder="Enter Password" required/>
          
            <label for="psw-repeat"><b>Repeat Password</b></label>
           <input type="password" placeholder="Repeat Password" name="psw-repeat" required/>
           <br></br>
            <br></br>
           <div class="clearfix">
          <br></br>
          <br></br>
  <button type="submit" onClick = {props.renderLogin} class="signupbtn">Explore!</button>
</div>

</div>
          
          }
       
</form>




              <span className="close" onClick={ closeModal }> X </span>
       </div>
     </div>
     </div>
     
        )
          
      
  }

  export default SignUpModal;