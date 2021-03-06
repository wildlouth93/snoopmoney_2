import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER
} from '../actions/session';

const _nullSession = {
  currentUserId: null
};

export default (state = _nullSession, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER: 
      return Object.assign({}, { currentUserId: action.payload.user.id});
    case LOGOUT_CURRENT_USER: 
      return _nullSession; 
    default: 
      return state; 
  }
}; 

