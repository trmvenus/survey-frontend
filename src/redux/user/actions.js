import {
  USER_LIST_GET_LIST,
  USER_LIST_GET_LIST_SUCCESS,
  USER_LIST_GET_LIST_ERROR,
  USER_LIST_ADD_ITEM,
  USER_LIST_ADD_ITEM_SUCCESS,
  USER_LIST_ADD_ITEM_ERROR,
  USER_LIST_DELETE_ITEMS,
  USER_LIST_DELETE_ITEMS_SUCCESS,
  USER_LIST_DELETE_ITEMS_ERROR,
  USER_LIST_CHANGE_ORGANIZATION,
  USER_LIST_CHANGE_ORGANIZATION_SUCCESS,
  USER_LIST_CHANGE_ORGANIZATION_ERROR,
} from '../actions';

export const getUserList = (filterOption) => ({
  type: USER_LIST_GET_LIST,
  payload: filterOption,
});

export const getUserListSuccess = (items) => ({
  type: USER_LIST_GET_LIST_SUCCESS,
  payload: items,
});

export const getUserListError = (error) => ({
  type: USER_LIST_GET_LIST_ERROR,
  payload: error,
});

export const addUser = (user) => ({
  type: USER_LIST_ADD_ITEM,
  payload: user,
});

export const addUserSuccess = (user) => ({
  type: USER_LIST_ADD_ITEM_SUCCESS,
  payload: user,
});

export const addUserError = (error) => ({
  type: USER_LIST_ADD_ITEM_ERROR,
  payload: error,
});

export const deleteUsers = (ids) => ({
  type: USER_LIST_DELETE_ITEMS,
  payload: ids,
});

export const deleteUsersSuccess = (items) => ({
  type: USER_LIST_DELETE_ITEMS_SUCCESS,
  payload: items,
});

export const deleteUsersError = (error) => ({
  type: USER_LIST_DELETE_ITEMS_ERROR,
  payload: error,
});

export const changeOrganization = (user_id, organization_id) => ({
  type: USER_LIST_CHANGE_ORGANIZATION,
  payload: {user_id, organization_id},
});

export const changeOrganizationSuccess = (user) => ({
  type: USER_LIST_CHANGE_ORGANIZATION_SUCCESS,
  payload: user,
});

export const changeOrganizationError = (error) => ({
  type: USER_LIST_CHANGE_ORGANIZATION_ERROR,
  payload: error,
});