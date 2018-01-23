import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import BucketListModal from '../BucketListModal';
import { MemoryRouter as Router } from 'react-router-dom';
import configureStore from '../../../store/configureStore';

const store = configureStore();

let component;
let props;

describe('BucketListModal component tests', () => {
  beforeAll(() => {
    props = {
      showModal: true,
      editing: true,
      closeModal: jest.fn(),
      bucketlist: {
        title: "Amaze balls",
        description: "Very amazing I must admit"
      }
    }
    component = shallow(
      <BucketListModal {...props} />
    )
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  })

  it('modal has closeButton', () => {
    expect(component.find('ModalHeader').at(0).props().closeButton).toEqual(true)
  })

  it('modal header is Add BucketList when not editing', () => {
    component.setProps({
      editing: false
    })
    expect(component.find('ModalTitle').at(0).props().children).toEqual('Add BucketList')
  })

  it('modal header is Edit BucketList when editing', () => {
    component.setProps({
      editing: true
    })
    expect(component.find('ModalTitle').at(0).props().children).toEqual('Edit BucketList')
  })

  it('has label for inputs', () => {
    expect(component.find('label').at(0).props().children).toEqual('Title')
    expect(component.find('label').at(1).props().children).toEqual('Description')
  })

  it('has title input of type text', () => {
    expect(component.find('input').at(0).props().type).toEqual('text')
    expect(component.find('input').at(0).props().name).toEqual('title')
    expect(component.find('input').at(0).props().placeholder).toEqual('Enter Title')
  })

  it('has textarea for description of type text', () => {
    expect(component.find('textarea').at(0).props().type).toEqual('text')
    expect(component.find('textarea').at(0).props().name).toEqual('description')
    expect(component.find('textarea').at(0).props().placeholder).toEqual('Description')
  })

  it('inputs have data (title, description) when editing', () => {
    expect(component.find('input').at(0).props().value).toEqual('Amaze balls')
    expect(component.find('textarea').at(0).props().value).toEqual('Very amazing I must admit')
  })

  it('has submit (Save) and Cancel buttons', () => {
    expect(component.find('Button').at(0).props().type).toEqual('submit')
    expect(component.find('Button').at(0).props().children).toEqual('Save')
    expect(component.find('Button').at(1).props().children).toEqual('Cancel')
  })

});