import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import * as itemActions from '../itemActions'
import * as types from '../actionTypes'

const middleware = [thunk]
const mockStore = configureMockStore(middleware)

jest.mock('../../api/itemsApi', () => ({
  saveItem: (item, bucketlist_id) => Promise.resolve(
    { item_id: 1, bucketlist_id: 1, item_name: 'Amazed item', status: false }
  ),
  editItem: (item) => Promise.resolve(
    { item_id: 1, bucketlist_id: 1, item_name: 'Amazed item', status: true }
  ),
  deleteItem: (item) => Promise.resolve(
    { item_id: 1, bucketlist_id: 1, item_name: 'Amazed item', status: true }
  )
}))

describe('Items Actions Tests', () => {
  it('should dispatch SAVE_BUCKETLIST_ITEM_SUCCESS when creating an item', () => {
      const expectedActions = [
        { type: types.SAVE_BUCKETLIST_ITEM_SUCCESS,
          item: { item_id: 1, bucketlist_id: 1, item_name: 'Amazed item', status: false }
        }
      ];
      const store = mockStore()
      return store.dispatch(itemActions.saveItem(expectedActions[0].item))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

  it('should dispatch EDIT_BUCKETLIST_ITEM_SUCCESS when updating a item', () => {
      const expectedActions = [
        { type: types.EDIT_BUCKETLIST_ITEM_SUCCESS,
          item: { item_id: 1, bucketlist_id: 1, item_name: 'Amazed item', status: true }
        }
      ]
      const store = mockStore()
      return store.dispatch(itemActions.editItem(expectedActions[0].item))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

  it('should dispatch DELETE_BUCKETLIST_ITEM_SUCCESS when deleting a bucketlist', () => {
      const expectedActions = [
        { type: types.DELETE_BUCKETLIST_ITEM_SUCCESS,
          item: { item_id: 1, bucketlist_id: 1, item_name: 'Amazed item', status: true }
        },
      ];
      const store = mockStore()
      store.dispatch(itemActions.deleteItem(expectedActions[0].item))
        .then(() => {
          expect(store.getActions().type).toEqual(expectedActions.type);
        })
    })
})

