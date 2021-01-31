import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { 
  SHARED_SURVEY_LIST_GET_LIST, 
  SHARED_SURVEY_LIST_ADD_ITEM, 
  SHARED_SURVEY_LIST_DELETE_ITEMS, 
  SHARED_SURVEY_LIST_COPY_ITEMS, 
  SHARED_SURVEY_LIST_SHARE_ITEM 
} from '../actions';

import {
  getSharedSurveyListSuccess,
  getSharedSurveyListError,
  addSharedSurveyItemSuccess,
  addSharedSurveyItemError,
  deleteSharedSurveyItemsSuccess,
  deleteSharedSurveyItemsError,
  copySharedSurveyItemsSuccess,
  copySharedSurveyItemsError,
  shareSharedSurveyItemSuccess,
  shareSharedSurveyItemError,
} from './actions';

const getSharedSurveyListRequest = async () => 
  await client
    .get('/survey/shared')
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});  

function* getSharedSurveyListItems() {
  try {
    const response = yield call(getSharedSurveyListRequest);
    yield put(getSharedSurveyListSuccess(response));
  } catch (error) {
    yield put(getSharedSurveyListError(error));
  }
}

const addSharedSurveyItemRequest = async (item) => 
  await client
    .post('/survey', item)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});

function* addSharedSurveyItem({ payload }) {
  try {
    const response = yield call(addSharedSurveyItemRequest, payload);
    yield put(addSharedSurveyItemSuccess(response));
  } catch (error) {
    yield put(addSharedSurveyItemError(error));
  }
}


const deleteSharedSurveyItemsRequest = async (item) =>
  await client
    .delete('/survey', item)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});

function* deleteSharedSurveyItems({ payload }) {
  try {
    const response = yield call(deleteSharedSurveyItemsRequest, payload);
    yield put(deleteSharedSurveyItemsSuccess(response));
  } catch (error) {
    yield put(deleteSharedSurveyItemsError(error));
  }
}

const copySharedSurveyItemsRequest = async (item) =>
  await client
    .post('/survey/copy', item)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});

function* copySharedSurveyItems({ payload }) {
  try {
    const response = yield call(copySharedSurveyItemsRequest, payload);
    yield put(copySharedSurveyItemsSuccess(response));
  } catch (error) {
    yield put(copySharedSurveyItemsError(error));
  }
}


const shareSharedSurveyItemRequest = async (item) =>
  await client
    .get(`/survey/${item.id}/share`)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});

function* shareSharedSurveyItem({ payload }) {
  try {
    const response = yield call(shareSharedSurveyItemRequest, payload);
    yield put(shareSharedSurveyItemSuccess(response));
  } catch (error) {
    yield put(shareSharedSurveyItemError(error));
  }
}


export function* watchGetList() {
  yield takeEvery(SHARED_SURVEY_LIST_GET_LIST, getSharedSurveyListItems);
}

export function* watchAddItem() {
  yield takeEvery(SHARED_SURVEY_LIST_ADD_ITEM, addSharedSurveyItem);
}

export function* watchDeleteItems() {
  yield takeEvery(SHARED_SURVEY_LIST_DELETE_ITEMS, deleteSharedSurveyItems);
}

export function* watchCopyItems() {
  yield takeEvery(SHARED_SURVEY_LIST_COPY_ITEMS, copySharedSurveyItems);
}

export function* watchShareItem() {
  yield takeEvery(SHARED_SURVEY_LIST_SHARE_ITEM, shareSharedSurveyItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddItem), fork(watchDeleteItems), fork(watchCopyItems), fork(watchShareItem)]);
}
