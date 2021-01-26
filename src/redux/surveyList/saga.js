import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { SURVEY_LIST_GET_LIST, SURVEY_LIST_ADD_ITEM, SURVEY_LIST_DELETE_ITEMS, SURVEY_LIST_COPY_ITEMS, SURVEY_LIST_SHARE_ITEM } from '../actions';

import {
  getSurveyListSuccess,
  getSurveyListError,
  addSurveyItemSuccess,
  addSurveyItemError,
  deleteSurveyItemsSuccess,
  deleteSurveyItemsError,
  copySurveyItemsSuccess,
  copySurveyItemsError,
  shareSurveyItemSuccess,
  shareSurveyItemError,
} from './actions';

const getSurveyListRequest = async () => 
  await client
    .get('/survey')
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});  

function* getSurveyListItems() {
  try {
    const response = yield call(getSurveyListRequest);
    yield put(getSurveyListSuccess(response));
  } catch (error) {
    yield put(getSurveyListError(error));
  }
}

const addSurveyItemRequest = async (item) => 
  await client
    .post('/survey', item)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});

function* addSurveyItem({ payload }) {
  try {
    const response = yield call(addSurveyItemRequest, payload);
    yield put(addSurveyItemSuccess(response));
  } catch (error) {
    yield put(addSurveyItemError(error));
  }
}


const deleteSurveyItemsRequest = async (item) =>
  await client
    .delete('/survey', item)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});

function* deleteSurveyItems({ payload }) {
  try {
    const response = yield call(deleteSurveyItemsRequest, payload);
    yield put(deleteSurveyItemsSuccess(response));
  } catch (error) {
    yield put(deleteSurveyItemsError(error));
  }
}

const copySurveyItemsRequest = async (item) =>
  await client
    .post('/survey/copy', item)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});

function* copySurveyItems({ payload }) {
  try {
    const response = yield call(copySurveyItemsRequest, payload);
    yield put(copySurveyItemsSuccess(response));
  } catch (error) {
    yield put(copySurveyItemsError(error));
  }
}


const shareSurveyItemRequest = async (item) =>
  await client
    .get(`/survey/${item.id}/share`)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});

function* shareSurveyItem({ payload }) {
  try {
    const response = yield call(shareSurveyItemRequest, payload);
    yield put(shareSurveyItemSuccess(response));
  } catch (error) {
    yield put(shareSurveyItemError(error));
  }
}


export function* watchGetList() {
  yield takeEvery(SURVEY_LIST_GET_LIST, getSurveyListItems);
}

export function* watchAddItem() {
  yield takeEvery(SURVEY_LIST_ADD_ITEM, addSurveyItem);
}

export function* watchDeleteItems() {
  yield takeEvery(SURVEY_LIST_DELETE_ITEMS, deleteSurveyItems);
}

export function* watchCopyItems() {
  yield takeEvery(SURVEY_LIST_COPY_ITEMS, copySurveyItems);
}

export function* watchShareItem() {
  yield takeEvery(SURVEY_LIST_SHARE_ITEM, shareSurveyItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddItem), fork(watchDeleteItems), fork(watchCopyItems), fork(watchShareItem)]);
}
