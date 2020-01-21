 import React, { Component } from 'react'
  import '../SignUpModal.css';

  
  const SignUpModal = props => {


        const divStyle = { 
          display: props.displayModal ? 'block' : 'none'
     };
     function closeModal(e) {
        e.stopPropagation()
        props.closeModal()
     }



        // console.log(props)
        return (
        <div>
              <div className="modal" onClick={ closeModal } style={divStyle}> 
              <div className="modal-content"   onClick={ e => e.stopPropagation()} >
              
              <form onSubmit = {(e) => props.handleOnSubmit(e)} action="action_page.php" >
               <div class="container">
               <h1>Join the global foodie fam!</h1>
                <p>Please fill in this form to create an account.</p>
               <hr/>

                <label for="email"><b>Username</b></label>
                <input name = "username" onChange = {(e) => props.handleOnChange(e)} value = {props.username} type="text" placeholder="Enter Username" required/>

                <label for="psw"><b>Password</b></label>
                <input name="password" onChange = {(e) => props.handleOnChange(e)}  value = {props.password} type="password" placeholder="Enter Password" required/>

                <label for="psw-repeat"><b>Repeat Password</b></label>
               <input type="password" placeholder="Repeat Password" name="psw-repeat" required/>
{/* 
    <label>
      <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me
    </label>

    <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p> */}
  <br></br>
  <br></br>
    <div class="clearfix">
    <br></br>
  <br></br>
      <button type="submit" class="signupbtn">Explore!</button>
    </div>
    
  </div>
</form>




              <span className="close" onClick={ closeModal }> X </span>
       </div>
     </div>
     </div>
        )
          
      
  }

  export default SignUpModal;