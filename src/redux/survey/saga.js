import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { GET_SURVEY, UPDATE_SURVEY } from '../actions';

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
    .catch((error) => {throw error});  


function* getSurveyItem({payload}) {
  try {
    const response = yield call(getSurveyRequest, payload);
    yield put(getSurveySuccess(response));
  } catch (error) {
    yield put(getSurveyError(error));
  }
}

const updateSurveyRequest = async (payload) => 
  await client
    .put(`/survey/${payload.id}`, payload)
    .then((res) => res.data)
    .catch((error) => {throw error});  


function* updateSurveyItem({payload}) {
  try {
    const response = yield call(updateSurveyRequest, payload);
    yield put(updateSurveySuccess(response));
  } catch (error) {
    yield put(updateSurveyError(error));
  }
}

export function* watchGetSurvey() {
  yield takeEvery(GET_SURVEY, getSurveyItem);
}

export function* watchUpdateSurvey() {
  yield takeEvery(UPDATE_SURVEY, updateSurveyItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetSurvey), fork(watchUpdateSurvey)]);
}
