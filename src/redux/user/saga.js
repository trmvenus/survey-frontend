import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { 
  USER_LIST_GET_LIST, 
  USER_LIST_ADD_ITEM, 
  USER_LIST_DELETE_ITEMS, 
  USER_LIST_CHANGE_ORGANIZATION, 
} from '../actions';

import {
  getUserListSuccess,
  getUserListError,
  addUserSuccess,
  addUserError,
  deleteUsersSuccess,
  deleteUsersError,
  changeOrganizationSuccess,
  changeOrganizationError,
} from './actions';

const getUserListRequest = async (payload) => 
  await client
    .get(`/user?pageSize=${payload.pageSize}&currentPage=${payload.currentPage}&orderBy=${payload.orderBy}&search=${payload.search}`)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});  

function* getUserListItems({payload}) {
  try {
    const response = yield call(getUserListRequest, payload);
    yield put(getUserListSuccess(response));
  } catch (error) {
    yield put(getUserListError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(USER_LIST_GET_LIST, getUserListItems);
}


const addUserRequest = async (payload) => 
  await client
    .post('/user', payload)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});  

function* addUser({payload}) {
  try {
    const response = yield call(addUserRequest, payload);
    yield put(addUserSuccess(response));
  } catch (error) {
    yield put(addUserError(error));
  }
}

export function* watchAddUser() {
  yield takeEvery(USER_LIST_ADD_ITEM, addUser);
}


const deleteUsersRequest = async (payload) => 
  await client
    .delete('/user', payload)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});  

function* deleteUsers({payload}) {
  try {
    const response = yield call(deleteUsersRequest, payload);
    yield put(deleteUsersSuccess(response));
  } catch (error) {
    yield put(deleteUsersError(error));
  }
}

export function* watchDeleteItems() {
  yield takeEvery(USER_LIST_DELETE_ITEMS, deleteUsers);
}


const changeUserOrganizationRequest = async (user_id, organization_id) => 
  await client
    .put(`/user/${user_id}/organization`, {organization_id})
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});  

function* changeUserOrganization({payload}) {
  const {user_id, organization_id} = payload;
  try {
    const response = yield call(changeUserOrganizationRequest, user_id, organization_id);
    yield put(changeOrganizationSuccess(response));
  } catch (error) {
    yield put(changeOrganizationError(error));
  }
}

export function* watchChangeUserOrganization() {
  yield takeEvery(USER_LIST_CHANGE_ORGANIZATION, changeUserOrganization);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddUser), fork(watchDeleteItems), fork(watchChangeUserOrganization)]);
}
