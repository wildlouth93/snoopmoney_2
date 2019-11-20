import { combineReducers } from 'redux';
import UsersReducer from './users';
import holdingsReducer from './holdings';
import watchlistItemsReducer from './watchlistitems';
import stocksReducer from './stocks';


export default combineReducers({ 
  users: UsersReducer,
  holdings: holdingsReducer,
  watchlistitems: watchlistItemsReducer,
  stocks: stocksReducer
});
