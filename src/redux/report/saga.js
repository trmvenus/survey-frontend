import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { 
  REPORT_LIST_GET_LIST, 
  REPORT_LIST_GET_ITEM, 
  REPORT_LIST_ADD_ITEM,
  REPORT_LIST_UPDATE_ITEM, 
  REPORT_LIST_DELETE_ITEM,
  REPORT_LIST_RESET_SHARE_LINK,
  REPORT_LIST_GET_ITEM_SHARE,
} from '../actions';

import {
  getReportListSuccess,
  getReportListError,
  getReportItemSuccess,
  getReportItemError,
  addReportItemSuccess,
  addReportItemError,
  updateReportItemSuccess,
  updateReportItemError,
  deleteReportItemSuccess,
  deleteReportItemError,
  resetReportShareLinkSuccess,
  resetReportShareLinkError,
} from './actions';

const getReportListRequest = async (payload) =>
  await client
    .get(`/report?survey=${payload.id}`)
    .then((user) => user.data)
    .catch((error) => {throw error.response.data});

function* getReportListItems({payload}) {
  try {
    const response = yield call(getReportListRequest, payload);
    yield put(getReportListSuccess(response));
  } catch (error) {
    yield put(getReportListError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(REPORT_LIST_GET_LIST, getReportListItems);
}


const getReportItemRequest = async (payload) =>
  await client
    .get(`/report/${payload.id}`)
    .then((user) => user.data)
    .catch((error) => {throw error.response.data});

function* getReportItem({payload}) {
  try {
    const response = yield call(getReportItemRequest, payload);
    yield put(getReportItemSuccess(response));
  } catch (error) {
    yield put(getReportItemError(error));
  }
}

export function* watchGetItem() {
  yield takeEvery(REPORT_LIST_GET_ITEM, getReportItem);
}


const getReportItemShareRequest = async (payload) =>
  await client
    .get(`/report/share?id=${payload.id}`)
    .then((user) => user.data)
    .catch((error) => {throw error.response.data});

function* getReportShareItem({payload}) {
  try {
    const response = yield call(getReportItemShareRequest, payload);
    yield put(getReportItemSuccess(response));
  } catch (error) {
    yield put(getReportItemError(error));
  }
}

export function* watchGetItemShare() {
  yield takeEvery(REPORT_LIST_GET_ITEM_SHARE, getReportShareItem);
}


const addReportItemRequest = async (item) => 
  await client
    .post('/report', item)
    .then((user) => user.data)
    .catch((error) => {throw error.response.data});

function* addReportItem({ payload }) {
  try {
    const response = yield call(addReportItemRequest, payload);
    yield put(addReportItemSuccess(response));
  } catch (error) {
    yield put(addReportItemError(error));
  }
}

export function* watchAddItem() {
  yield takeEvery(REPORT_LIST_ADD_ITEM, addReportItem);
}


const updateReportItemRequest = async (payload) => {
  const id = payload.id;
  if (payload.filter) {
    return await client
      .put(`/report/${id}`, {filter: payload.filter})
      .then((res) => res.data)
      .catch((error) => {throw error.response.data}); 
  } else if (payload.sections) {
    return await client
      .put(`/report/${id}`, {sections: payload.sections})
      .then((res) => res.data)
      .catch((error) => {throw error.response.data}); 
  } else {
    throw new Error("Param Error");
  }
} 

function* updateReportItem({payload}) {
  try {
    const response = yield call(updateReportItemRequest, payload);
    yield put(updateReportItemSuccess(response));
  } catch (error) {
    yield put(updateReportItemError(error));
  }
}

export function* watchUpdateItem() {
  yield takeEvery(REPORT_LIST_UPDATE_ITEM, updateReportItem);
}


const deleteReportItemRequest = async (id) => 
  await client
    .delete(`/report/${id}`)
    .then((res) => res.data)
    .catch((err) => {throw err.response.data});  

function* deleteReportItem({payload}) {
  const {id} = payload;
  try {
    const response = yield call(deleteReportItemRequest, id);
    yield put(deleteReportItemSuccess(response));
  } catch (error) {
    yield put(deleteReportItemError(error));
  }
}

export function* watchDeleteItem() {
  yield takeEvery(REPORT_LIST_DELETE_ITEM, deleteReportItem);
}


const resetReportShareLinkRequest = async (id) => 
  await client
    .put(`/report/${id}/reset`)
    .then(res => res.data)
    .catch(err => {throw err.response.data});

function* resetReportShareLink({payload}) {
  try {
    const response = yield call(resetReportShareLinkRequest, payload.id);
    yield put(resetReportShareLinkSuccess(response));
  } catch (error) {
    yield put(resetReportShareLinkError(error));
  }
}

export function* watchResetReportShareLink() {
  yield takeEvery(REPORT_LIST_RESET_SHARE_LINK, resetReportShareLink);
}


export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchGetItem), fork(watchGetItemShare), fork(watchAddItem), fork(watchUpdateItem), 
              fork(watchDeleteItem), fork(watchResetReportShareLink), ]);
}
