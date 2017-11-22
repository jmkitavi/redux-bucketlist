import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function bucketlistReducer(state = initialState.bucketlists, action) {
  switch(action.type) {
    case types.FETCH_BUCKETLISTS:
      return action.bucketlists;

    default:
      return state;
  }
}
