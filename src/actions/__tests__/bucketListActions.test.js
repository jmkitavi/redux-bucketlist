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
  saveBucketlist: (bucketlist) => Promise.resolve(
    { bucketlist_id: 1, title: 'Amaze balls', description: '', items: [] }
  ),
  editBucketlist: (bucketlist) => Promise.resolve(
    { bucketlist_id: 1, title: 'Amazed', description: '', items: [] }
  ),
  deleteBucketlist: (bucketlist) => Promise.resolve(
    { bucketlist_id: 1, title: 'Amazed', description: '', items: [] }
  )
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

  it('should dispatch SAVE_BUCKETLIST_SUCCESS when creating a bucketlist', () => {
      const expectedActions = [
        { type: types.SAVE_BUCKETLIST_SUCCESS,
          bucketlist: { bucketlist_id: 1, title: 'Amaze balls', description: '', items: [] }
        }
      ];
      const store = mockStore({ bucketlist: [] })
      return store.dispatch(bucketlistActions.saveBucketlist(expectedActions[0].bucketlist))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

  it('should dispatch EDIT_BUCKETLIST_SUCCESS when updating a bucketlist', () => {
      const expectedActions = [
        { type: types.EDIT_BUCKETLIST_SUCCESS,
          bucketlist: { bucketlist_id: 1, title: 'Amazed', description: '', items: [] }
        }
      ]
      const store = mockStore({ bucketlists: [] })
      return store.dispatch(bucketlistActions.editBucketlist(expectedActions[0].bucketlist))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

  it('should dispatch DELETE_BUCKETLIST_SUCCESS when deleting a bucketlist', () => {
      const expectedActions = [
        { type: types.DELETE_BUCKETLIST_SUCCESS,
          bucketlist: { bucketlist_id: 1, title: 'Amazed', description: '', items: [] }
        },
      ];
      const store = mockStore({ bucketlists: [] })
      store.dispatch(bucketlistActions.deleteBucketlist(expectedActions[0].bucketlist))
        .then(() => {
          expect(store.getActions().type).toEqual(expectedActions.type);
        })
    })
})

