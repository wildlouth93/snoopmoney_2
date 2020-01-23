import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root';
import thunk from 'redux-thunk';
import logger from 'redux-logger';;

const configureStore = (preloadedState = {}) => (
  createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger))
);

export default configureStore; 

// to take logger out in production, just take logger out of applyMiddleware function

