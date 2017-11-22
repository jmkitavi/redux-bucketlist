import axios from 'axios';

const config = {
  headers: { 'Authorization': `token ${localStorage.getItem("Authorization")}`}
};
const url = 'http://127.0.0.1:5000/bucketlists/';

class BucketlistAPI {
  static fetchBucketlists() {
    return axios.get(url, config)
    .then(response => {
      return response.data.bucketlists
    })
    .catch(error => {
      console.log(error);
    });
  }
}

export default BucketlistAPI;
