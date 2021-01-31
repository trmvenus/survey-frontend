import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { DASHBOARD_GET_MY_INFO } from '../actions';

import {
  getMyDashboardInfoSuccess,
  getMyDashboardInfoError,
} from './actions';

const getMyDashboardInfoAsync = async () => 
  await client
    .get(`/dashboard/myinfo`)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});  

function* getMyDashboardInfo() {
  try {
    const response = yield call(getMyDashboardInfoAsync);
    yield put(getMyDashboardInfoSuccess(response));
  } catch (error) {
    yield put(getMyDashboardInfoError(error));
  }
}

export function* watchGetMyInfo() {
  yield takeEvery(DASHBOARD_GET_MY_INFO, getMyDashboardInfo);
}



export default function* rootSaga() {
  yield all([fork(watchGetMyInfo)]);
}
