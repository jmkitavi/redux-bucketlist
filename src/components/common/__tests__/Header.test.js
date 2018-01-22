import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import Header from '../Header';
import { MemoryRouter as Router } from 'react-router-dom';
import configureStore from '../../../store/configureStore';

let component;
let menuitems;
let props;

const store = configureStore();

describe('Header component tests', () => {
  beforeAll(() => {
    component = shallow(
        <Router>
          <Header />
        </Router>,
        {context: { store }}
      ).dive().dive().dive();
  });

  it('renders correctly', () => {
    expect(component).toMatchSnapshot();
  });

  it('renders links when not logged in', () => {
    let navlinks = component.find('NavLink')
    expect(navlinks.at(0).props().children).toEqual("Bucket Lists")
    expect(navlinks.at(1).props().children).toEqual("Log in")
    expect(navlinks.at(2).props().children).toEqual("Sign Up")
  })

  it('renders different links when logged in', () => {
    component.setProps({user: true})
    let navlinks = component.find('NavLink')
    expect(navlinks.at(0).props().children).toEqual("Bucket Lists")
    expect(navlinks.at(1).props().children).toEqual("Log Out")
  })
});