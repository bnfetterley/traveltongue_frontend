import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userActions from '../redux/actions';
import '../css/SignUpModal.css';

const Login = (props) => {
  const login = useSelector((state) => state);

  // initializing dispatch
  // Setting up local state using the useState hook
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  // controlled form functions
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userActions.loginUserToDB(loginForm));
    props.closeModal();
    // props.history.push('/');
    // })
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      dispatch(userActions.persistUser());
    }
  }, []);

  const handleChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  // Destructuring keys from our local state to use in the form
  const { username, password } = loginForm;

  //modal functionality
  const divStyle = {
    display: props.displayModal ? 'block' : 'none',
  };
  function closeModal(e) {
    e.stopPropagation();
    props.closeModal();
  }

  console.log(props, login);
  // Component code
  return (
    <div className="container">
      <div className="modal" onClick={closeModal} style={divStyle}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={closeModal}>
            {' '}
            X{' '}
          </span>
          <form onSubmit={handleSubmit}>
            <h1>Login Page</h1>
            <input
              type="textarea"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Username"
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
