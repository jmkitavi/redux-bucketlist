import * as types from './actionTypes';
import UserAPI from '../api/userApi';


export function checkLoginSuccess(status) {
  return { type: types.SET_LOGGED_IN_STATUS, status }
}

export function checkLogin() {
  return dispatch => {
    dispatch(checkLoginSuccess(UserAPI.checkLogInStatus()));
  }
}
