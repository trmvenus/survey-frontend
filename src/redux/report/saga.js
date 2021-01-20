import { func } from 'prop-types';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { 
  REPORT_LIST_GET_LIST, 
  REPORT_LIST_GET_ITEM, 
  REPORT_LIST_UPDATE_ITEM, 
  REPORT_LIST_ADD_ITEM} from '../actions';

import {
  getReportListSuccess,
  getReportListError,
  getReportItemSuccess,
  getReportItemError,
  addReportItemSuccess,
  addReportItemError,
  updateReportItemSuccess,
  updateReportItemError,
} from './actions';

const getReportListRequest = async (payload) =>
  await client
    .get(`/report?survey=${payload.id}`)
    .then((user) => user.data)
    .catch((error) => {throw error});

function* getReportListItems({payload}) {
  try {
    const response = yield call(getReportListRequest, payload);
    yield put(getReportListSuccess(response));
  } catch (error) {
    yield put(getReportListError(error));
  }
}


const getReportItemRequest = async (payload) =>
  await client
    .get(`/report?survey=${payload.survey_id}&ip=${payload.ip_address}`)
    .then((user) => user.data)
    .catch((error) => {throw error});

function* getReportItem({payload}) {
  try {
    const response = yield call(getReportItemRequest, payload);
    yield put(getReportItemSuccess(response));
  } catch (error) {
    yield put(getReportItemError(error));
  }
}

const addReportItemRequest = async (item) => 
  await client
    .post('/report', item)
    .then((user) => user.data)
    .catch((error) => {throw error});


function* addReportItem({ payload }) {
  try {
    const response = yield call(addReportItemRequest, payload);
    yield put(addReportItemSuccess(response));
  } catch (error) {
    yield put(addReportItemError(error));
  }
}


const updateReportItemRequest = async (payload) => 
  await client
    .put(`/report`, payload)
    .then((res) => res.data)
    .catch((error) => {throw error});  


function* updateReportItem({payload}) {
  try {
    const response = yield call(updateReportItemRequest, payload);
    yield put(updateReportItemSuccess(response));
  } catch (error) {
    yield put(updateReportItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(REPORT_LIST_GET_LIST, getReportListItems);
}

export function* watchGetItem() {
  yield takeEvery(REPORT_LIST_GET_ITEM, getReportItem);
}

export function* watchAddItem() {
  yield takeEvery(REPORT_LIST_ADD_ITEM, addReportItem);
}

export function* watchPostItem() {
  yield takeEvery(REPORT_LIST_UPDATE_ITEM, updateReportItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchGetItem), fork(watchAddItem), fork(watchPostItem)]);
}
