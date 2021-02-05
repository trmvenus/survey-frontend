import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { GET_SURVEY, GET_SURVEY_BY_EMAIL_LINK, GET_SURVEY_BY_WEB_LINK, UPDATE_SURVEY } from '../actions';

import {
  getSurveySuccess,
  getSurveyError,
  updateSurveySuccess,
  updateSurveyError,
} from './actions';


export function* watchGetSurvey() {
  yield takeEvery(GET_SURVEY, getSurveyItem);
}

const getSurveyRequest = async (payload) => 
  await client
    .get(`/survey/${payload.id}`)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});  


function* getSurveyItem({payload}) {
  try {
    const response = yield call(getSurveyRequest, payload);
    yield put(getSurveySuccess(response));
  } catch (error) {
    yield put(getSurveyError(error.response.data));
  }
}


export function* watchGetSurveyByWebLink() {
  yield takeEvery(GET_SURVEY_BY_WEB_LINK, getSurveyByWebLink);
}

const getSurveyByWebLinkRequest = async (id) => 
  await client
    .get(`/survey/w/share?id=${id}`)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});  


function* getSurveyByWebLink({payload}) {
  try {
    const {id} = payload;
    const response = yield call(getSurveyByWebLinkRequest, id);
    if (response.success) {
      yield put(getSurveySuccess(response.survey));
    } else {
      yield put(getSurveyError(response));
    }
  } catch (error) {
    yield put(getSurveyError(error.response.data));
  }
}


export function* watchGetSurveyByEmailLink() {
  yield takeEvery(GET_SURVEY_BY_EMAIL_LINK, getSurveyByEmailLink);
}

const getSurveyByEmailLinkRequest = async (id) => 
  await client
    .get(`/survey/e/share?id=${id}`)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});  


function* getSurveyByEmailLink({payload}) {
  try {
    const {id} = payload;
    const response = yield call(getSurveyByEmailLinkRequest, id);
    if (response.success) {
      yield put(getSurveySuccess(response.survey));
    } else {
      yield put(getSurveyError(response));
    }
  } catch (error) {
    yield put(getSurveyError(error.response.data));
  }
}


export function* watchUpdateSurvey() {
  yield takeEvery(UPDATE_SURVEY, updateSurveyItem);
}

const updateSurveyRequest = async (payload) => 
  await client
    .put(`/survey/${payload.id}`, payload)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});  


function* updateSurveyItem({payload}) {
  try {
    const response = yield call(updateSurveyRequest, payload);
    yield put(updateSurveySuccess(response));
  } catch (error) {
    yield put(updateSurveyError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchGetSurvey), 
    fork(watchGetSurveyByWebLink), 
    fork(watchGetSurveyByEmailLink),
    fork(watchUpdateSurvey),]);
}
