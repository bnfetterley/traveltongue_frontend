import React, { useState } from 'react';
import '../css/SignUpModal.css';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions.js';

const SignUpModal = (props) => {
  // Setting up local state using the useState hook
  const [signupForm, setSignupForm] = useState({
    username: '',
    password: '',
  });

  // Controlled form functions
  const handleChange = (e) =>
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });

  const divStyle = {
    display: props.displayModal ? 'block' : 'none',
  };
  function closeModal(e) {
    e.stopPropagation();
    props.closeModal();
  }

  // initializing dispatch
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // const { history } = props;
    dispatch(userActions.newUserToDB(signupForm));
    // history.push('/');

    props.closeModal();
  };

  // Destructuring keys from our local state to use in the form
  const { username, password } = signupForm;

  return (
    <div className="container">
      <div className="modal" onClick={closeModal} style={divStyle}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <form onSubmit={(e) => handleSubmit(e)} action="action_page.php">
            <span className="close" onClick={closeModal}>
              {' '}
              X{' '}
            </span>
            <div className="container">
              <h1>Discover and share dishes from around the world! </h1>
              <p>Join our global foodie fam below.</p>
              <hr />

              <label htmlFor="username">
                <b>Username</b>
              </label>
              <input
                name="username"
                onChange={(e) => handleChange(e)}
                value={username}
                type="textarea"
                placeholder="Enter Username"
                required
              />
              <br></br>
              <br></br>
              <label htmlFor="psw">
                <b>Password</b>
              </label>
              <input
                name="password"
                onChange={(e) => handleChange(e)}
                value={password}
                type="password"
                placeholder="Enter Password"
                required
              />

              <label htmlFor="psw-repeat">
                <b>Repeat Password</b>
              </label>
              <input
                type="password"
                placeholder="Repeat Password"
                name="psw-repeat"
                required
              />
              <br></br>
              <br></br>
              <div className="clearfix">
                <br></br>
                <br></br>
                <button
                  type="submit"
                  onClick={props.selectLogInModal}
                  className="signupbtn"
                >
                  Explore!
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
