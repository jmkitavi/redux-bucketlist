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
      return [...state, action.bucketlist];

    case types.DELETE_BUCKETLIST_SUCCESS:
      return state.filter(bucketlist => bucketlist.bucketlist_id !== action.bucketlist_id)

    case types.EDIT_BUCKETLIST_SUCCESS:
      return [
        ...state.map(bucketlist => bucketlist.bucketlist_id === action.bucketlist.bucketlist_id ? action.bucketlist : bucketlist)
      ]

    case types.SAVE_BUCKETLIST_ITEM_SUCCESS:
      return state.map(bucketlist => {
        if (bucketlist.bucketlist_id === action.item.bucketlist_id) {
          return {
            ...bucketlist,
            items: [...bucketlist.items, action.item]
          }
        }
        return bucketlist
      })


    case types.EDIT_BUCKETLIST_ITEM_SUCCESS:
      return state.map(bucketlist => {
        if (bucketlist.bucketlist_id === action.item.bucketlist_id) {
          return {
            ...bucketlist,
            items: [ ...bucketlist.items.map(item => item.item_id === action.item.item_id ? action.item : item)]
          }
        }
        return bucketlist
      })

      case types.DELETE_BUCKETLIST_ITEM_SUCCESS:
      return state.map(bucketlist => { // loop through bucketlists
        if (bucketlist.bucketlist_id === action.item.bucketlist_id) { // find the bucketlist
          return  {
            ...bucketlist,
            items: bucketlist.items.filter(item => item.item_id !== action.item.item_id )
          } // remove item and return new bucketlist
        }
        return bucketlist // return all bucketlists after map
      })

    default:
      return state;
  }
}
