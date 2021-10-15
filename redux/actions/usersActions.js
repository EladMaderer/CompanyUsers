import {SET_USERS, SEARCH_USERS, CLEAR_USERS} from './usersTypes';

export const setUsers = users => ({
  type: SET_USERS,
  payload: users,
});
export const searchUsers = users => ({
  type: SEARCH_USERS,
  payload: users,
});
export const clearUsers = () => ({
  type: CLEAR_USERS,
});
