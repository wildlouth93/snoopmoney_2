import {
  RECEIVE_STOCKS,
  RECEIVE_STOCK,
} from '../actions/stock_actions';

import {
  RECEIVE_CURRENT_USER
} from '../actions/session';


const stocksReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_STOCKS:
      return Object.assign({}, state, action.stocks);
    case RECEIVE_STOCK:
      return Object.assign({}, state, { [action.stock.symbol]: action.stock });
    default:
      return state;
  }
}

export default stocksReducer; 