import {
  RECEIVE_WATCHLIST_ITEMS,
  RECEIVE_WATCHLIST_ITEM,
  REMOVE_WATCHLIST_ITEM
} from '../actions/watchlistitem_actions';

const watchListItemsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_WATCHLIST_ITEMS:
      return Object.assign({}, state, action.holdings);
    case RECEIVE_WATCHLIST_ITEM:
      return Object.assign({}, state, { [action.holding.ticker]: action.holding });
    case REMOVE_WATCHLIST_ITEM:
      let newState = Object.assign({}, state);
      delete newState[action.ticker];
      return newState;
    default:
      return state;
  }
}

export default watchListItemsReducer; 