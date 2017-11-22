import { combineReducers } from 'redux';
import user from './userReducer';
import bucketlists from './bucketlistReducer';

const rootReducer = combineReducers({
  user,
  bucketlists
});

export default rootReducer;
