import * as types from './actionTypes';
import UserAPI from '../api/userApi';


export function checkLoginSuccess(status) {
  return { type: types.CHECK_LOGGED_IN_STATUS, status }
}

export function logOut() {
  return { type: types.USER_LOGOUT }
}

export function checkLogin() {
  return dispatch => {
    dispatch(checkLoginSuccess(UserAPI.checkLogInStatus()));
  }
}
