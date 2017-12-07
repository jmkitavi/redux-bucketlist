import * as types from './actionTypes';
import BucketlistAPI from '../api/bucketlistApi';


export function fetchBucketlistsSuccess(bucketlists) {
  return { type: types.FETCH_BUCKETLISTS_SUCCESS, bucketlists}
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

export function deleteBucketlist(bucketlist_id) {
  return dispatch => {
    return BucketlistAPI.deleteBucketlist(bucketlist_id).then(response => {
      dispatch(deleteBucketlistSuccess(bucketlist_id))
    }).catch(error => console.log(error))
  }
}