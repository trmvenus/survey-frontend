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
  USER_LIST_UPDATE_ITEM_SUCCESS,
  USER_LIST_UPDATE_ITEM_ERROR,
  USER_LIST_UPDATE_ITEM,
  MY_RESET_PASSWORD,
  MY_RESET_PASSWORD_ERROR,
  MY_RESET_PASSWORD_SUCCESS
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

export const updateUser = (user_id, user) => ({
  type: USER_LIST_UPDATE_ITEM,
  payload: {user_id, user}
})

export const updateUserError = (error) => ({
  type: USER_LIST_UPDATE_ITEM_ERROR,
  payload: error
})

export const updateUserSuccess = (user) => ({
  type: USER_LIST_UPDATE_ITEM_SUCCESS,
  payload: user
})

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

export const resetPassword = (user_id, originalPassword, newPassword) => ({
  type: MY_RESET_PASSWORD,
  payload: {user_id, originalPassword, newPassword}
});

export const resetPasswordError = (err) => ({
  type: MY_RESET_PASSWORD_ERROR,
  payload: err
});

export const resetPasswordSuccess = () => ({
  type: MY_RESET_PASSWORD_SUCCESS,
  payload: {}
});