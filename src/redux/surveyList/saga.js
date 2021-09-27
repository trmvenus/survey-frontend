import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import {
  SURVEY_LIST_GET_TOTAL,
  SURVEY_LIST_GET_LIST,
  SURVEY_LIST_ADD_ITEM, 
  SURVEY_LIST_DELETE_ITEMS, 
  SURVEY_LIST_COPY_ITEMS, 
  SURVEY_LIST_SHARE_ITEM, 
  SURVEY_LIST_ACTIVE_ITEM,
  SURVEY_LIST_SET_MULTI_RESPONSES_ITEM,
  SURVEY_STYLE_UPDATE_ITEM,
  SURVEY_STYLE_UPDATE_ITEM_ERROR,
} from '../actions';

import {
  getSurveyTotalListSuccess,
  getSurveyTotalListError,
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
  activeSurveyItemSuccess,
  activeSurveyItemError,
  setMultiResponsesSurveyItemSuccess,
  setMultiResponsesSurveyItemError,
  changeStyleSurveyItem_Success,
  changeStyleSurveyItem_Error
} from './actions';

export function* watchGetList() {
  yield takeEvery(SURVEY_LIST_GET_LIST, getSurveyListItems);
}

const getSurveyListRequest = async () =>
  await client
    .get('/survey')
    .then((res) => res.data)
    .catch((error) => { throw error.response.data });

function* getSurveyListItems() {
  try {
    const response = yield call(getSurveyListRequest);
    yield put(getSurveyListSuccess(response));
  } catch (error) {
    yield put(getSurveyListError(error));
  }
}

export function* watchGetTotalList() {
  yield takeEvery(SURVEY_LIST_GET_TOTAL, getSurveyTotalListItems);
}

const getSurveyTotalListRequest = async () =>
  await client
    .get('/survey/all')
    .then((res) => res.data)
    .catch((error) => { throw error.response.data });

function* getSurveyTotalListItems() {
  try {
    const response = yield call(getSurveyTotalListRequest);
    yield put(getSurveyTotalListSuccess(response));
  } catch (error) {
    yield put(getSurveyTotalListError(error));
  }
}

export function* watchAddItem() {
  yield takeEvery(SURVEY_LIST_ADD_ITEM, addSurveyItem);
}

const addSurveyItemRequest = async (item) =>
  await client
    .post('/survey', item)
    .then((res) => res.data)
    .catch((error) => { throw error.response.data });

function* addSurveyItem({ payload }) {
  try {
    const response = yield call(addSurveyItemRequest, payload);
    yield put(addSurveyItemSuccess(response));
  } catch (error) {
    yield put(addSurveyItemError(error));
  }
}


export function* watchDeleteItems() {
  yield takeEvery(SURVEY_LIST_DELETE_ITEMS, deleteSurveyItems);
}

const deleteSurveyItemsRequest = async (item) =>
  await client
    .delete('/survey', item)
    .then((res) => res.data)
    .catch((error) => { throw error.response.data });

function* deleteSurveyItems({ payload }) {
  try {
    const response = yield call(deleteSurveyItemsRequest, payload);
    yield put(deleteSurveyItemsSuccess(response));
  } catch (error) {
    yield put(deleteSurveyItemsError(error));
  }
}


export function* watchCopyItems() {
  yield takeEvery(SURVEY_LIST_COPY_ITEMS, copySurveyItems);
}

const copySurveyItemsRequest = async (item) =>
  await client
    .post('/survey/copy', item)
    .then((res) => res.data)
    .catch((error) => { throw error.response.data });

function* copySurveyItems({ payload }) {
  try {
    const response = yield call(copySurveyItemsRequest, payload);
    yield put(copySurveyItemsSuccess(response));
  } catch (error) {
    yield put(copySurveyItemsError(error));
  }
}


export function* watchShareItem() {
  yield takeEvery(SURVEY_LIST_SHARE_ITEM, shareSurveyItem);
} 

const shareSurveyItemRequest = async (item) =>
  await client
    .put(`/survey/${item.id}/share`)
    .then((res) => res.data)
    .catch((error) => { throw error.response.data });

function* shareSurveyItem({ payload }) {
  try {
    const response = yield call(shareSurveyItemRequest, payload);
    yield put(shareSurveyItemSuccess(response));
  } catch (error) {
    yield put(shareSurveyItemError(error));
  }
}

export function* watchUpdateStyleItem() {
  yield takeEvery(SURVEY_STYLE_UPDATE_ITEM, updateStyleSurveyItem)
}

const updateStyleSurveyItemRequest = async (item) => 
  await client
    .post(`/survey/style`, item)
    .then((res) => res.data)
    .catch((error) => { throw error.response.data });

function* updateStyleSurveyItem({payload}) {
  try{
    const response = yield call(updateStyleSurveyItemRequest, payload);
    yield put(changeStyleSurveyItem_Success(response))
  } catch (error) {
    yield put(changeStyleSurveyItem_Error(error))
  }
}

export function* watchActiveItem() {
  yield takeEvery(SURVEY_LIST_ACTIVE_ITEM, activeSurveyItem);
}

const activeSurveyItemRequest = async (item) =>
  await client
    .put(`/survey/${item.id}/active`)
    .then((res) => res.data)
    .catch((error) => { throw error.response.data });

function* activeSurveyItem({ payload }) {
  try {
    const response = yield call(activeSurveyItemRequest, payload);
    yield put(activeSurveyItemSuccess(response));
  } catch (error) {
    yield put(activeSurveyItemError(error));
  }
}


export function* watchSetMultiResponsesItem() {
  yield takeEvery(SURVEY_LIST_SET_MULTI_RESPONSES_ITEM, setMultiResponsesSurveyItem);
}

const setMultiResponsesSurveyItemRequest = async (item) =>
  await client
    .put(`/survey/${item.id}/multi-responses`)
    .then((res) => res.data)
    .catch((error) => { throw error.response.data });

function* setMultiResponsesSurveyItem({ payload }) {
  try {
    const response = yield call(setMultiResponsesSurveyItemRequest, payload);
    yield put(setMultiResponsesSurveyItemSuccess(response));
  } catch (error) {
    yield put(setMultiResponsesSurveyItemError(error));
  }
}


export default function* rootSaga() {
  yield all([
    fork(watchGetList),
    fork(watchAddItem),
    fork(watchDeleteItems),
    fork(watchCopyItems),
    fork(watchShareItem),
    fork(watchUpdateStyleItem),
    fork(watchActiveItem),
    fork(watchSetMultiResponsesItem),
    fork(watchGetTotalList)
  ]);
}
