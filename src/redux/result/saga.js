import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { 
  RESULT_LIST_UPDATE_ITEM, 
  RESULT_LIST_GET_LIST, 
  RESULT_LIST_GET_ITEM, 
  RESULT_LIST_POST_ITEM, 
  RESULT_LIST_POST_MANUAL_ITEM,
  RESULT_LIST_GET_ITEM_BY_WEB_LINK_AND_NAME,
  IS_COMPLETE_UPDATE, 
} from '../actions';

import {
  getResultListSuccess,
  getResultListError,
  getResultItemSuccess,
  getResultItemError,
  updateResultItemSuccess,
  updateResultItemError,
  postResultItemSuccess,
  postResultItemError,
  postManualResultItemSuccess,
  postManualResultItemError,
  isCompleteUpdate1
} from './actions';

export function* watchGetList() {
  yield takeEvery(RESULT_LIST_GET_LIST, getResultListItems);
}

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


export function* watchGetItem() {
  yield takeEvery(RESULT_LIST_GET_ITEM, getResultItem);
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


export function* watchGetItemByWebLinkAndName() {
  yield takeEvery(RESULT_LIST_GET_ITEM_BY_WEB_LINK_AND_NAME, getResultItemByWebLinkAndName);
}

const getResultItemByWebLinkAndNameRequest = async (payload) =>
  await client
    .get(`/result?survey=${payload.survey_id}&weblink_link=${payload.weblink_link_id}&name=${payload.name}&ip=${payload.ip_address}`)
    .then((user) => user.data)
    .catch((error) => {throw error.response.data});

function* getResultItemByWebLinkAndName({payload}) {
  try {
    const response = yield call(getResultItemByWebLinkAndNameRequest, payload);
    yield put(getResultItemSuccess(response));
  } catch (error) {
    yield put(getResultItemError(error));
  }
}


export function* watchPostItem() {
  yield takeEvery(RESULT_LIST_POST_ITEM, postResultItem);
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


export function* watchUpdateItem() {
  yield takeEvery(RESULT_LIST_UPDATE_ITEM, updateResultItem);
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

// export function* watchIsCompleteUpdate() {
//   yield takeEvery(IS_COMPLETE_UPDATE,isCompleteUpdate)
// }

// function* isCompleteUpdate({payload}) {
//  yield put(isCompleteUpdate1(payload))
// }

export function* watchPostManualItem() {
  yield takeEvery(RESULT_LIST_POST_MANUAL_ITEM, postManualResultItem);
}

const postManualResultItemAsync = async (payload) =>
  await client
    .post(`/result/manual`, payload)
    .then(res => res.data)
    .catch(error => {throw error.response.data});

function* postManualResultItem({payload}) {
  try {
    const response = yield call(postManualResultItemAsync, payload);
    yield put(postManualResultItemSuccess(response));
  } catch (error) {
    yield put(postManualResultItemError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList), 
    fork(watchGetItem), 
    fork(watchGetItemByWebLinkAndName),
    fork(watchPostItem), 
    fork(watchUpdateItem),
    // fork(watchIsCompleteUpdate),
    fork(watchPostManualItem),
  ]);
}
