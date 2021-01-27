import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { GET_SURVEY, GET_SURVEY_SHARE, UPDATE_SURVEY } from '../actions';

import {
  getSurveySuccess,
  getSurveyError,
  updateSurveySuccess,
  updateSurveyError,
} from './actions';

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

export function* watchGetSurvey() {
  yield takeEvery(GET_SURVEY, getSurveyItem);
}


const getSurveyByShareRequest = async (payload) => 
  await client
    .get(`/survey/share?id=${payload.id}`)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});  


function* getSurveyByShare({payload}) {
  try {
    const response = yield call(getSurveyByShareRequest, payload);
    if (response.success) {
      yield put(getSurveySuccess(response.survey));
    } else {
      yield put(getSurveyError(response));
    }
  } catch (error) {
    yield put(getSurveyError(error.response.data));
  }
}

export function* watchGetSurveyByShare() {
  yield takeEvery(GET_SURVEY_SHARE, getSurveyByShare);
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

export function* watchUpdateSurvey() {
  yield takeEvery(UPDATE_SURVEY, updateSurveyItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetSurvey), fork(watchGetSurveyByShare), fork(watchUpdateSurvey),]);
}
