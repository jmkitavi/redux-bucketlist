import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import * as userActions from '../userActions'
import * as types from '../actionTypes'

const middleware = [thunk]
const mockStore = configureMockStore(middleware)

jest.mock('../../api/userApi', () => ({
  checkLogInStatus: () => true
}))

describe('User Actions Tests', () => {
  it('should dispatch CHECK_LOGGED_IN_STATUS', () => {
    const expectedAction = {
      type: types.CHECK_LOGGED_IN_STATUS,
      status: true
    }
    const action = userActions.checkLoginSuccess(expectedAction.status)
    expect(action).toEqual(expectedAction)
  })

  it('should dispatch CHECK_LOGGED_IN_STATUS', () => {
    const expectedAction = [
      { type: types.CHECK_LOGGED_IN_STATUS,
        status: true
      }
    ]

    const store = mockStore()
    store.dispatch(userActions.checkLogin())
    expect(store.getActions()).toEqual(expectedAction)
  })

  it('should dispatch USER_LOGOUT', () => {
    const expectedAction = {
      type: types.USER_LOGOUT,
    }
    const action = userActions.logOut()
    expect(action).toEqual(expectedAction)
  })
})


