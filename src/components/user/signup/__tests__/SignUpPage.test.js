import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import SignUpPage from '../SignUpPage';
import { MemoryRouter as Router } from 'react-router-dom';

let component;
let menuitems;
let props;


describe('Sign Up component tests', () => {
  beforeAll(() => {
    component = mount(
      <Router>
        <SignUpPage />
      </Router>
    );

    // console.log(component.find('input'))
  });

  it('renders correctly', () => {
    // expect(component).toMatchSnapshot();
  });

  it('has 4 divs', () => {
    expect(component.find('div')).toHaveLength(4)
  })

  it('has 3 inputs', () => {
    expect(component.find('input')).toHaveLength(3)
  })

  it('check all 3 inputs: username, password, submit', () => {
    let inputs = component.find('input')
    expect(inputs.at(0).props().name).toEqual('username')
    expect(inputs.at(1).props().name).toEqual('password')
    expect(inputs.at(2).props().value).toEqual('Sign Up')
  })

});