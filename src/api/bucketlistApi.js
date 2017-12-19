import axios from 'axios';

let config = () => {
  var token = { headers: { 'Authorization': `token ${localStorage.getItem("Authorization")}`} }
  return token
}
const url = 'http://127.0.0.1:5000/bucketlists/';

class BucketlistAPI {
  static fetchBucketlists() {
    return axios.get(url, config())
    .then(response => {
      return response.data.bucketlists
    })
    .catch(error => {
      console.log(error);
    });
  }

  static deleteBucketlist(bucketlist_id) {
    return axios.delete(url + bucketlist_id, config())
    .then(response => {
      return response
    })
    .catch(error => {
      console.log(error);
    })
  }

  static saveBucketlist(bucketlist) {
    return axios.post(url, bucketlist, config())
    .then(response => {
      console.log("api", response)
      return response
    })
    .catch(error => {
      console.log(error);
    })
  }
}

export default BucketlistAPI;
