/* eslint-disable no-unused-vars */
import { all } from 'redux-saga/effects';

import authSagas from './auth/saga';
import entireSurveySagas from './entireSurvey/saga';
import surveyListSagas from './surveyList/saga';
import sharedSurveySaga from './sharedSurvey/saga';
import categoryListSagas from './categoryList/saga';
import surveySaga from './survey/saga';
import resultSaga from './result/saga';
import reportSaga from './report/saga';
import webLinkSaga from './weblink/saga';
import emailLinkSaga from './emaillink/saga';
import userSaga from './user/saga';
import organizationSaga from './organization/saga';
import pillarSaga from './pillar/saga';
import dashboardSaga from './dashboard/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    entireSurveySagas(),
    surveyListSagas(),
    sharedSurveySaga(),
    categoryListSagas(),
    surveySaga(),
    resultSaga(),
    reportSaga(),
    webLinkSaga(),
    emailLinkSaga(),
    userSaga(),
    organizationSaga(),
    pillarSaga(),
    dashboardSaga(),
  ]);
}
