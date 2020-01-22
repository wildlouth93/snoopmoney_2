import {
  RECEIVE_WATCHLIST_ITEMS,
  RECEIVE_WATCHLIST_ITEM,
  REMOVE_WATCHLIST_ITEM
} from '../actions/watchlistitem_actions';

import {
  RECEIVE_CURRENT_USER
} from '../actions/session';

const watchListItemsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    // case RECEIVE_CURRENT_USER: 
    //   return Object.assign({}, state, action.payload.watchlistitems);
    case RECEIVE_WATCHLIST_ITEMS:
      return Object.assign({}, state, action.watchlistitems);
    case RECEIVE_WATCHLIST_ITEM:
      return Object.assign({}, state, { [action.watchlistitem.ticker]: action.watchlistitem });
    case REMOVE_WATCHLIST_ITEM:
      let newState = Object.assign({}, state);
      delete newState[action.ticker];
      return newState;
    default:
      return state;
  }
}

export default watchListItemsReducer; 