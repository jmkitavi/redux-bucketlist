import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import * as bucketlistActions from '../bucketlistActions'
import * as types from '../actionTypes'

const middleware = [thunk]
const mockStore = configureMockStore(middleware)

jest.mock('../../api/bucketlistApi', () => ({
  fetchBucketlists: () => Promise.resolve([
    { bucketlist_id: 1, title: 'Amazing', description: '', items: [] }
  ]),
}))

describe('BucketList Actions Tests', () => {
  it('should dispatch FETCH_BUCKETLISTS_SUCCESS when loading bucketlists', () => {
      const expectedActions = [
          { type: types.FETCH_BUCKETLISTS_SUCCESS,
            bucketlists: [
              { bucketlist_id: 1, title: 'Amazing', description: '', items: [] }
            ]
          }
        ]
      const store = mockStore({ bucketlists: [] })
      return store.dispatch(bucketlistActions.fetchBucketlists()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  })



})

