import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch(action.type) {
    case types.CHECK_LOGGED_IN_STATUS:
      return action.status;

    default:
      return state;
  }
}
