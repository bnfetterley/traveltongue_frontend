import App from './App'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import actions from './redux/actions';

const State = (props) => {
  
    const username = useSelector(state => state.username
        )

        const login = useSelector(state => state)

    console.log(username)
    
      return (
        <App login = {login}/>
      )}

export default State