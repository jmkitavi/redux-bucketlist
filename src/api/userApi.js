import axios from 'axios';
import jwt from 'jsonwebtoken';

const loginUrl = 'http://127.0.0.1:5000/auth/login';
const signUpUrl = 'http://127.0.0.1:5000/auth/register';

class UserAPI {
  static checkLogInStatus() {
    let token  = localStorage.getItem('Authorization')
    let decodedToken = jwt.decode(token, {complete: true})
    let dateNow = new Date()
    if (!decodedToken) {
      return false
    } else {
      if (decodedToken.header.exp > (dateNow.getTime() / 1000)) { // hack to remove milliseconds
        return true
      } else {
        return false
      }
    }
  }

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