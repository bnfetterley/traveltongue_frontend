import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom"
import * as serviceWorker from './serviceWorker';
import MapContainer from './components/Map'
import SignUpModal from './components/SignUpModal'

import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import rootReducer from './redux/rootReducer.js'


const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(<BrowserRouter>
<Provider store={store}>
<App />
</Provider>

</BrowserRouter>, document.getElementById("root"));
// ReactDom.render(<ComponentName/>, document.getElementById("showhideControlDiv "))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

