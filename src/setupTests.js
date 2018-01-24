// To be able to use this as of React v16, we’ll also need to include a setup file that tells Enzyme and Jest what adapters to use
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

global.localStorage = localStorageMock

Enzyme.configure({ adapter: new Adapter() });