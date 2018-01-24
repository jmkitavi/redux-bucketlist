import React from 'react';
import { shallow, mount } from 'enzyme';
import BucketListsPage from '../BucketListsPage';
import configureStore from '../../../store/configureStore';

const store = configureStore();

let component;
let props;

jest.mock('../../../api/bucketlistApi', () => ({
  fetchBucketlists: () => Promise.resolve([
    { bucketlist_id: 1, title: 'Amazing', description: '', items: [] },
    { bucketlist_id: 2, title: 'Amazed', description: '', items: [] }
  ]),
}))


describe('BucketListsPage component tests', () => {
  beforeAll(() => {
    props = {
      bucketlists: [
        { bucketlist_id: 1, title: 'Amazing', description: '', items: [] },
        { bucketlist_id: 2, title: 'Amazed', description: '', items: [] }
      ]
    }
    component = shallow(
      <BucketListsPage {...props}/>,
      {context: { store }}
    ).dive()
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('has Add Bucketlist button', () => {
    expect(component.find('Button').at(0).props().children[1]).toEqual(' Add BucketList')
  })
});