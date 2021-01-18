import {
  USER_GET_LIST,
  USER_GET_LIST_SUCCESS,
  USER_GET_LIST_ERROR,
  USER_GET_LIST_WITH_FILTER,
  USER_ADD,
  USER_ADD_SUCCESS,
  USER_ADD_ERROR,
} from '../actions';

export const getUserList = (filterOption) => ({
  type: USER_GET_LIST,
  payload: filterOption,
});

export const getUserListSuccess = (items) => ({
  type: USER_GET_LIST_SUCCESS,
  payload: items,
});

export const getUserListError = (error) => ({
  type: USER_GET_LIST_ERROR,
  payload: error,
});

export const getUserListWithFilter = (column, value) => ({
  type: USER_GET_LIST_WITH_FILTER,
  payload: { column, value },
});

export const addUser = (user) => ({
  type: USER_ADD,
  payload: user,
});

export const addUserSuccess = (user) => ({
  type: USER_ADD_SUCCESS,
  payload: user,
});

export const addUserError = (error) => ({
  type: USER_ADD_ERROR,
  payload: error,
});

