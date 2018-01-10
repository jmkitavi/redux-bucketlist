import toastr from 'toastr';
import * as types from './actionTypes';
import BucketlistAPI from '../api/bucketlistApi';


export function fetchBucketlistsSuccess(bucketlists) {
  return { type: types.FETCH_BUCKETLISTS_SUCCESS, bucketlists}
}

export function saveBucketlistSuccess(bucketlist) {
  return { type: types.SAVE_BUCKETLIST_SUCCESS, bucketlist }
}

export function editBucketlistSuccess(bucketlist) {
  return { type: types.EDIT_BUCKETLIST_SUCCESS, bucketlist }
}

export function deleteBucketlistSuccess(bucketlist_id) {
  return { type: types.DELETE_BUCKETLIST_SUCCESS, bucketlist_id}
}

export function fetchBucketlists() {
  return dispatch => {
    return BucketlistAPI.fetchBucketlists().then(bucketlists => {
      dispatch(fetchBucketlistsSuccess(bucketlists))
    }).catch(error => console.log(error))
  }
}

export function saveBucketlist(bucketlist) {
  return dispatch => {
    return BucketlistAPI.saveBucketlist(bucketlist)
    .then(savedBucketlist => {
      toastr.success(`BucketList ${bucketlist.title} added successfully`)
      dispatch(saveBucketlistSuccess(bucketlist))
    }).catch(error => console.log(error))
  }
}

export function editBucketlist(bucketlist) {
  return dispatch => {
    return BucketlistAPI.editBucketlist(bucketlist)
    .then(editedBucketlist => {
      toastr.success(`BucketList ${bucketlist.title} updated successfully`)
      dispatch(editBucketlistSuccess(bucketlist))
    }).catch(error => console.log(error))
  }
}

export function deleteBucketlist(bucketlist) {
  return dispatch => {
    return BucketlistAPI.deleteBucketlist(bucketlist.bucketlist_id)
    .then(response => {
      toastr.success(`BucketList ${bucketlist.title} deleted successfully`)
      dispatch(deleteBucketlistSuccess(bucketlist.bucketlist_id))
    }).catch(error => console.log(error))
  }
}