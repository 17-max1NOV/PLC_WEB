import { combineReducers } from 'redux';
import reducers from './reducers';
import cms from './cms';
const rootReducer = combineReducers({
  reducers: reducers, 
  cms:cms
});

export default rootReducer;
