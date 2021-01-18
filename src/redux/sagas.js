/* eslint-disable no-unused-vars */
import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import surveyListSagas from './surveyList/saga';
import categoryListSagas from './categoryList/saga';
import surveySaga from './survey/saga';
import resultSaga from './result/saga';
import userSaga from './user/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    surveyListSagas(),
    categoryListSagas(),
    surveySaga(),
    resultSaga(),
    userSaga(),
  ]);
}
