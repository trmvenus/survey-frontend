import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { RESULT_LIST_UPDATE_ITEM, RESULT_LIST_GET_LIST, RESULT_LIST_GET_ITEM, RESULT_LIST_POST_ITEM } from '../actions';

import {
  getResultListSuccess,
  getResultListError,
  getResultItemSuccess,
  getResultItemError,
  updateResultItemSuccess,
  updateResultItemError,
  postResultItemSuccess,
  postResultItemError,
} from './actions';

const getResultListRequest = async (payload) =>
  await client
    .get(`/result/list?survey=${payload.id}`)
    .then((user) => user.data)
    .catch((error) => {throw error.response.data});

function* getResultListItems({payload}) {
  try {
    const response = yield call(getResultListRequest, payload);
    yield put(getResultListSuccess(response));
  } catch (error) {
    yield put(getResultListError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(RESULT_LIST_GET_LIST, getResultListItems);
}


const getResultItemRequest = async (payload) => {
  if (payload.survey_id) {
    return await client
    .get(`/result?survey=${payload.survey_id}&ip=${payload.ip_address}`)
    .then((user) => user.data)
    .catch((error) => {throw error.response.data});
  } else {
    return await client
    .get(`/result/${payload.id}`)
    .then((user) => user.data)
    .catch((error) => {throw error.response.data});
  }
  
}

function* getResultItem({payload}) {
  try {
    const response = yield call(getResultItemRequest, payload);
    yield put(getResultItemSuccess(response));
  } catch (error) {
    yield put(getResultItemError(error));
  }
}

export function* watchGetItem() {
  yield takeEvery(RESULT_LIST_GET_ITEM, getResultItem);
}


const postResultItemRequest = async (payload) => 
  await client
    .post(`/result`, payload)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});  


function* postResultItem({payload}) {
  try {
    const response = yield call(postResultItemRequest, payload);
    yield put(postResultItemSuccess(response));
  } catch (error) {
    yield put(postResultItemError(error));
  }
}

export function* watchPostItem() {
  yield takeEvery(RESULT_LIST_POST_ITEM, postResultItem);
}


const updateResultItemRequest = async (payload) => 
  await client
    .put(`/result`, payload)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});  


function* updateResultItem({payload}) {
  try {
    const response = yield call(updateResultItemRequest, payload);
    yield put(updateResultItemSuccess(response));
  } catch (error) {
    yield put(updateResultItemError(error));
  }
}

export function* watchUpdateItem() {
  yield takeEvery(RESULT_LIST_UPDATE_ITEM, updateResultItem);
}


export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchGetItem), fork(watchPostItem), fork(watchUpdateItem)]);
}
