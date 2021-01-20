import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { PILLAR_LIST_GET_LIST, PILLAR_LIST_ADD_ITEM } from '../actions';

import {
  getPillarListSuccess,
  getPillarListError,
  addPillarItemSuccess,
  addPillarItemError,
} from './actions';

const getPillarListRequest = async () => {
  return await client
    .get('/pillar')
    .then((user) => user.data)
    .catch((error) => {throw error});
}


function* getPillarListItems() {
  try {
    const response = yield call(getPillarListRequest);
    yield put(getPillarListSuccess(response));
  } catch (error) {
    yield put(getPillarListError(error));
  }
}

const addPillarItemRequest = async (item) => 
  await client
    .post('/pillar', item)
    .then((user) => user.data)
    .catch((error) => {throw error});


function* addPillarItem({ payload }) {
  try {
    const response = yield call(addPillarItemRequest, payload);
    yield put(addPillarItemSuccess(response));
  } catch (error) {
    yield put(addPillarItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(PILLAR_LIST_GET_LIST, getPillarListItems);
}

export function* watchAddItem() {
  yield takeEvery(PILLAR_LIST_ADD_ITEM, addPillarItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddItem)]);
}
