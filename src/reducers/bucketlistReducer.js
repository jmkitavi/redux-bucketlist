import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function bucketlistReducer(state = initialState.bucketlists, action) {
  switch(action.type) {
    case types.USER_LOGOUT:
      state = []
      return state;

    case types.FETCH_BUCKETLISTS_SUCCESS:
      return action.bucketlists;

    case types.SAVE_BUCKETLIST_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.bucketlist)
      ];

    case types.DELETE_BUCKETLIST_SUCCESS:
      return state.filter(bucketlist => bucketlist.bucketlist_id !== action.bucketlist_id)

    default:
      return state;
  }
}
