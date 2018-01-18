import * as types from './actionTypes';
import ItemsAPI from '../api/itemsApi';


export function saveItemSuccess(item) {
  return { type: types.SAVE_BUCKETLIST_ITEM_SUCCESS, item}
}

export function deleteItemSuccess(item) {
  return { type: types.DELETE_BUCKETLIST_ITEM_SUCCESS, item}
}

export function editItemSuccess(item) {
  return { type: types.EDIT_BUCKETLIST_ITEM_SUCCESS, item }
}

export function saveItem(item, bucketlist_id) {
  return dispatch => {
    return ItemsAPI.saveItem(item, bucketlist_id)
    .then(savedItem => {
      dispatch(saveItemSuccess(savedItem))
    })
    .catch(error => console.log(error))
  }
}

export function editItem(item) {
  return dispatch => {
    return ItemsAPI.editItem(item)
    .then(response => {
      dispatch(editItemSuccess(item))
    })
    .catch(error => {
      console.log(error)
    })
  }
}

export function deleteItem(item) {
  return dispatch => {
    return ItemsAPI.deleteItem(item)
    .then(response => {
      dispatch(deleteItemSuccess(item))
    })
    .catch(error => console.log(error))
  }
}