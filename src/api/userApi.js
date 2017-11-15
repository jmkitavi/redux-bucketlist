import axios from 'axios';

const loginUrl = 'http://127.0.0.1:5000/auth/login';
const signUpUrl = 'http://127.0.0.1:5000/auth/register';

class UserAPI {
  static loginUser(username, password) {
    return axios.post(loginUrl, { username, password })
    .then(response => {
      return response
    })
    .catch(error => {
      return error
    });
  }

  static signUpUser(username, password) {
    return axios.post(signUpUrl, {username, password})
    .then((response) => {
      return response
    })
    .catch(error => {
      return error
    })
  }

}

export default UserAPI;