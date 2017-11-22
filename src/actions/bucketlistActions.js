import * as types from './actionTypes';
import BucketlistAPI from '../api/bucketlistApi';


export function fetchBucketlistsSuccess(bucketlists) {
  return { type: types.FETCH_BUCKETLISTS, bucketlists}
}

export function fetchBucketlists() {
  return dispatch => {
    return BucketlistAPI.fetchBucketlists().then(bucketlists => {
      dispatch(fetchBucketlistsSuccess(bucketlists))
    }).catch(error => console.log(error))
  }
}
