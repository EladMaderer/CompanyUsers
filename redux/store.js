import {combineReducers, createStore} from 'redux';
import usersReducer from './reducers/usersReducer';

const rootReducer = combineReducers({
  usersReducer,
});

const store = createStore(rootReducer);

export default store;
