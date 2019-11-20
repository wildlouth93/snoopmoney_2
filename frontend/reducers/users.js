import {
  RECEIVE_CURRENT_USER
} from '../actions/session';

export default (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, { [action.payload.user.id]: action.payload.user });
    default:
      return state;
  }
}; 