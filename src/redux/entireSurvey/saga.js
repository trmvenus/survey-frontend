import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import {
  ENTIRE_SURVEY_LIST_GET_LIST,
  ENTIRE_SURVEY_LIST_DELETE_ITEMS, 
  ENTIRE_SURVEY_LIST_COPY_ITEMS, 
  ENTIRE_SURVEY_LIST_SHARE_ITEM, 
  ENTIRE_SURVEY_LIST_ACTIVE_ITEM,
  ENTIRE_SURVEY_LIST_SET_MULTI_RESPONSES_ITEM
} from '../actions';

import {
  getEntireSurveyListSuccess,
  getEntireSurveyListError,
  deleteEntireSurveyItemsSuccess,
  deleteEntireSurveyItemsError,
  copyEntireSurveyItemsSuccess,
  copyEntireSurveyItemsError,
  shareEntireSurveyItemSuccess,
  shareEntireSurveyItemError,
  activeEntireSurveyItemSuccess,
  activeEntireSurveyItemError,
  setMultiResponsesEntireSurveyItemSuccess,
  setMultiResponsesEntireSurveyItemError,
} from './actions';

export function* watchGetList() {
  yield takeEvery(ENTIRE_SURVEY_LIST_GET_LIST, getEntireSurveyListItems);
}

const getEntireSurveyListRequest = async () =>
  await client
    .get('/survey/all')
    .then((res) => res.data)
    .catch((error) => { throw error.response.data });

function* getEntireSurveyListItems() {
  try {
    const response = yield call(getEntireSurveyListRequest);
    yield put(getEntireSurveyListSuccess(response));
  } catch (error) {
    yield put(getEntireSurveyListError(error));
  }
}


export function* watchDeleteItems() {
  yield takeEvery(ENTIRE_SURVEY_LIST_DELETE_ITEMS, deleteEntireSurveyItems);
}

const deleteEntireSurveyItemsRequest = async (item) =>
  await client
    .delete('/survey', item)
    .then((res) => res.data)
    .catch((error) => { throw error.response.data });

function* deleteEntireSurveyItems({ payload }) {
  try {
    const response = yield call(deleteEntireSurveyItemsRequest, payload);
    yield put(deleteEntireSurveyItemsSuccess(response));
  } catch (error) {
    yield put(deleteEntireSurveyItemsError(error));
  }
}


export function* watchCopyItems() {
  yield takeEvery(ENTIRE_SURVEY_LIST_COPY_ITEMS, copyEntireSurveyItems);
}

const copyEntireSurveyItemsRequest = async (item) =>
  await client
    .post('/survey/copy', item)
    .then((res) => res.data)
    .catch((error) => { throw error.response.data });

function* copyEntireSurveyItems({ payload }) {
  try {
    const response = yield call(copyEntireSurveyItemsRequest, payload);
    yield put(copyEntireSurveyItemsSuccess(response));
  } catch (error) {
    yield put(copyEntireSurveyItemsError(error));
  }
}


export function* watchShareItem() {
  yield takeEvery(ENTIRE_SURVEY_LIST_SHARE_ITEM, shareEntireSurveyItem);
} 

const shareEntireSurveyItemRequest = async (item) =>
  await client
    .put(`/survey/${item.id}/share`)
    .then((res) => res.data)
    .catch((error) => { throw error.response.data });

function* shareEntireSurveyItem({ payload }) {
  try {
    const response = yield call(shareEntireSurveyItemRequest, payload);
    yield put(shareEntireSurveyItemSuccess(response));
  } catch (error) {
    yield put(shareEntireSurveyItemError(error));
  }
}


export function* watchActiveItem() {
  yield takeEvery(ENTIRE_SURVEY_LIST_ACTIVE_ITEM, activeEntireSurveyItem);
}

const activeEntireSurveyItemRequest = async (item) =>
  await client
    .put(`/survey/${item.id}/active`)
    .then((res) => res.data)
    .catch((error) => { throw error.response.data });

function* activeEntireSurveyItem({ payload }) {
  try {
    const response = yield call(activeEntireSurveyItemRequest, payload);
    yield put(activeEntireSurveyItemSuccess(response));
  } catch (error) {
    yield put(activeEntireSurveyItemError(error));
  }
}


export function* watchSetMultiResponsesItem() {
  yield takeEvery(ENTIRE_SURVEY_LIST_SET_MULTI_RESPONSES_ITEM, setMultiResponsesEntireSurveyItem);
}

const setMultiResponsesEntireSurveyItemRequest = async (item) =>
  await client
    .put(`/survey/${item.id}/multi-responses`)
    .then((res) => res.data)
    .catch((error) => { throw error.response.data });

function* setMultiResponsesEntireSurveyItem({ payload }) {
  try {
    const response = yield call(setMultiResponsesEntireSurveyItemRequest, payload);
    yield put(setMultiResponsesEntireSurveyItemSuccess(response));
  } catch (error) {
    yield put(setMultiResponsesEntireSurveyItemError(error));
  }
}


export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchDeleteItems),
    fork(watchCopyItems),
    fork(watchShareItem),
    fork(watchActiveItem),
    fork(watchSetMultiResponsesItem),
  ]);
}
