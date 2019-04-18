import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer from './ducks/userReducer'

export default createStore(userReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)));
