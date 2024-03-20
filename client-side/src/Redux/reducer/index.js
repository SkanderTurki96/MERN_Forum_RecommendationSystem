import { combineReducers } from 'redux';

import userReducer from './user';
import postReducer from './posts';
import tagReducer from './tags';
import themereducer from './theme'

const rootReducer = combineReducers({
  userReducer,
  postReducer,
  tagReducer,
  themereducer
});
export default rootReducer;
