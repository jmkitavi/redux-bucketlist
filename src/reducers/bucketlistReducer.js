import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function bucketlistReducer(state = initialState.bucketlists, action) {
  switch(action.type) {
    case types.USER_LOGOUT:
      state = []
      return state;

      return action.bucketlists;

    default:
      return state;
  }
}
