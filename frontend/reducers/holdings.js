import {
  RECEIVE_HOLDINGS, 
  RECEIVE_HOLDING,
  REMOVE_HOLDING
} from '../actions/holding_actions';

const holdingsReducer = (state={}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_HOLDINGS:
      return Object.assign({}, state, action.events);
    case RECEIVE_HOLDING:
      return Object.assign({}, state, { [action.event.id]: action.event });
    case REMOVE_HOLDING:
      let newState = Object.assign({}, state);
      delete newState[action.eventId];
      return newState;
    default:
      return state; 
  }
}

export default holdingsReducer; 