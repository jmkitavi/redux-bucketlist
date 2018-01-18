import axios from 'axios';

let config = () => {
  var token = { headers: { 'Authorization': `token ${localStorage.getItem("Authorization")}`} }
  return token
}

const baseUrl = 'http://127.0.0.1:5000/bucketlists/';

class ItemsAPI {
  static deleteItem(item) {
    const url = baseUrl + item.bucketlist_id + "/items/" + item.item_id
    return axios.delete(url, config())
    .then(response => {
      return response
    })
    .catch(error => {
      console.log(error);
    })
  }

  static saveItem(item, bucketlist_id) {
    const url = baseUrl + bucketlist_id + "/items/"
    return axios.post(url, item, config())
    .then(response => {
      console.log(response)
      return response.data.item
    })
    .catch(error => {
      console.log(error)
    })
  }

  static editItem(item) {
    const url = baseUrl + item.bucketlist_id + "/items/" + item.item_id
    return axios.put(url, item, config())
    .then(response => {
      console.log(response)
      return response
    })
    .catch(error => {
      console.log(error)
    })
  }

}

export default ItemsAPI;
