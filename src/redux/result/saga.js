import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { RESULT_LIST_UPDATE_ITEM, RESULT_LIST_GET_LIST, RESULT_LIST_GET_ITEM } from '../actions';

import {
  getResultListSuccess,
  getResultListError,
  getResultItemSuccess,
  getResultItemError,
  updateResultItemSuccess,
  updateResultItemError,
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

export function* watchGetList() {
  yield takeEvery(RESULT_LIST_GET_LIST, getResultListItems);
}

export function* watchGetItem() {
  yield takeEvery(RESULT_LIST_GET_ITEM, getResultItem);
}

export function* watchPostItem() {
  yield takeEvery(RESULT_LIST_UPDATE_ITEM, updateResultItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchGetItem), fork(watchPostItem)]);
}
