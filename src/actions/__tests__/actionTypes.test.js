import * as types from '../actionTypes';

describe('Action types tests', () => {
  it('asserts action types', () => {
    expect(types.CHECK_LOGGED_IN_STATUS).toEqual('CHECK_LOGGED_IN_STATUS');
    expect(types.USER_LOGOUT).toEqual('USER_LOGOUT');

    expect(types.FETCH_BUCKETLISTS_SUCCESS).toEqual('FETCH_BUCKETLISTS_SUCCESS')
    expect(types.SAVE_BUCKETLIST_SUCCESS).toEqual('SAVE_BUCKETLIST_SUCCESS');
    expect(types.EDIT_BUCKETLIST_SUCCESS).toEqual('EDIT_BUCKETLIST_SUCCESS');
    expect(types.DELETE_BUCKETLIST_SUCCESS).toEqual('DELETE_BUCKETLIST_SUCCESS');

    expect(types.SAVE_BUCKETLIST_ITEM_SUCCESS).toEqual('SAVE_BUCKETLIST_ITEM_SUCCESS');
    expect(types.EDIT_BUCKETLIST_ITEM_SUCCESS).toEqual('EDIT_BUCKETLIST_ITEM_SUCCESS');
    expect(types.DELETE_BUCKETLIST_ITEM_SUCCESS).toEqual('DELETE_BUCKETLIST_ITEM_SUCCESS');

  });
});