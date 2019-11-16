import { combineReducers } from 'redux';
import UsersReducer from './users';
import holdingsReducer from './holdings';
import watchlistItemsReducer from './watchlistitems';


export default combineReducers({ 
  users: UsersReducer,
  holdings: holdingsReducer,
  watchlistitems: watchlistItemsReducer
});
