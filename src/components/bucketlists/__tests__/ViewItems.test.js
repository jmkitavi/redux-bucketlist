import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import ViewItems from '../ViewItems';
import { MemoryRouter as Router } from 'react-router-dom';
import configureStore from '../../../store/configureStore';

const store = configureStore();

let component;
let props;

describe('ViewItems component tests', () => {
  beforeAll(() => {
    props = {
      showModal: true,
      closeModal: jest.fn(),
      viewBucketlist: {
        title: "Amaze balls",
        description: "Very amazing I must admit",
        items: [
          { item_id: 1, item_name: 'Good', status: false},
          { item_id: 2, item_name: 'Amazing', status: true}
        ]
      }
    }
    component = shallow(
      <ViewItems {...props} />,
      {context: {store}}
    ).dive()
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  })

  it('has modal header has closeButton', () => {
    expect(component.find('ModalHeader').at(0).props().closeButton).toEqual(true)
  })

  it('modal title is bucketlist title', () => {
    expect(component.find('ModalTitle').at(0).props().children).toEqual('Amaze balls')
  })

  it('has label for add item input', () => {
    expect(component.find('label').at(0).props().children).toEqual('Add Item')
  })

  it('has add button for adding new items', () => {
    expect(component.find('button').at(0).props().children[1]).toEqual(' Add')
  })

  it('has label edit item when editing and value of item name in input', () => {
    component.setState({
      editing: true,
      item_name: 'Amazing'
    })
    expect(component.find('label').at(0).props().children).toEqual('Edit Item')
    expect(component.find('input').at(0).props().value).toEqual('Amazing')
  })

  it('has edit and cancel button for editing items', () => {
    component.setState({
      editing: true
    })
    expect(component.find('button').at(0).props().children[1]).toEqual(' Edit')
    expect(component.find('button').at(1).props().children[1]).toEqual(' Cancel')
  })

  it('displays bucketlist items passed', () => {
    expect(component.find('td').at(0).props().children).toEqual('Amazing')
    expect(component.find('td').at(3).props().children).toEqual('Good')
  })

  it('displays toggle buttons for each', () => {
    expect(component.find('ReactBootstrapToggle').length).toEqual(2)
  })


});