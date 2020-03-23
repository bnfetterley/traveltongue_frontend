import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import * as serviceWorker from './serviceWorker';
import MapContainer from './components/Map'
import SignUpModal from './components/SignUpModal'
import State from './State'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import rootReducer from './redux/rootReducer.js'
import { useSelector, useDispatch } from 'react-redux'
// import login from ./State



// const store = createStore(rootReducer, applyMiddleware(thunk))
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// const State = (props) => {
  
//     const username = useSelector(state => state.username
//         )
//         const login = useSelector(state => state)
//         // export default login
//     console.log(username)
    
//     //   return (
//     //      null
//     //   )}
//     }
// export default State




ReactDOM.render(<BrowserRouter>
<Provider store={store}>
<State />
{/* <App /> */}
</Provider>

</BrowserRouter>, document.getElementById("root"));
// ReactDom.render(<ComponentName/>, document.getElementById("showhideControlDiv "))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

