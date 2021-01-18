import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { USER_GET_LIST, USER_ADD } from '../actions';

import {
  getUserListSuccess,
  getUserListError,
  addUserSuccess,
  addUserError,
} from './actions';

const getUserListRequest = async (payload) => 
  await client
    .get(`/user?pageSize=${payload.pageSize}&currentPage=${payload.currentPage}&orderBy=${payload.orderBy}&search=${payload.search}`)
    .then((res) => res.data)
    .catch((error) => {throw error});  

function* getUserListItems({payload}) {
  try {
    console.log('getUserListItems');
    console.log(payload);
    const response = yield call(getUserListRequest, payload);
    console.log("response");
    console.log(response);
    yield put(getUserListSuccess(response));
  } catch (error) {
    yield put(getUserListError(error));
  }
}


const addUserRequest = async (payload) => 
  await client
    .post('/user', payload)
    .then((res) => res.data)
    .catch((error) => {throw error});  

function* addUser({payload}) {
  try {
    const response = yield call(addUserRequest, payload);
    yield put(addUserSuccess(response));
  } catch (error) {
    yield put(addUserError(error));
  }
}


export function* watchGetList() {
  yield takeEvery(USER_GET_LIST, getUserListItems);
}

export function* watchAddUser() {
  yield takeEvery(USER_ADD, addUser);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddUser)]);
}
