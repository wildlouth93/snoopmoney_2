import { 
  RECEIVE_SESSION_ERRORS, 
  RECEIVE_CURRENT_USER,
  CLEAR_SESSION_ERRORS
} from '../actions/session';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS: 
      console.log(action);
      return action.errors; 
    case RECEIVE_CURRENT_USER: 
      return []; 
    case CLEAR_SESSION_ERRORS: 
      return []; 
    default:
      return state; 
  }
};