import {SET_USERS, SEARCH_USERS, CLEAR_USERS} from '../actions/usersTypes';

const INITIAL_STATE = {
  users: [],
  searchTerm: '',
};

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USERS:
      return {...state, users: [...state.users, ...action.payload]};
    case SEARCH_USERS:
      return {...state, searchTerm: action.payload};
    case CLEAR_USERS:
      return {...state, users: []};
    default:
      return state;
  }
};

export default usersReducer;
