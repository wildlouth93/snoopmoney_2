import { combineReducers } from 'redux';
import UsersReducer from './users';
import holdingsReducer from './holdings';


export default combineReducers({ 
  users: UsersReducer,
  holdings: holdingsReducer
});
