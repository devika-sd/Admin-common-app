import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import App from './App/index';
import * as serviceWorker from './serviceWorker';
import reducer from './store/reducer';
import config from './config';

import {applyMiddleware, combineReducers, createStore} from 'redux';
import userReducer from './Reducer/user-reducer';
import authReducer from './Reducer/auth-reducer';
import orderReducer from './Reducer/order-reducer';
import thunkMiddleware from 'redux-thunk';

const loggerMiddleware = storeAPI => next => action => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', storeAPI.getState())
    return result
  }
  
const myEnhancer = applyMiddleware(loggerMiddleware,thunkMiddleware)
const appStore = createStore(combineReducers({userReducer,authReducer,orderReducer,reducer}) , myEnhancer)

window.store=appStore;

const app = (
    <Provider store={appStore}>
        <BrowserRouter basename={config.basename}>
            {/* basename="/datta-able" */}
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
