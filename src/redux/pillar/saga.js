import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { PILLAR_LIST_GET_LIST, PILLAR_LIST_ADD_ITEM,PILLAR_LIST_DELETE_ITEMS, PILLAR_LIST_UPDATE_ITEM } from '../actions';

import {
  getPillarListSuccess,
  getPillarListError,
  addPillarItemSuccess,
  addPillarItemError,
  deletePillarItemSuccess,
  deletePillarItemError,
  updatePillarItemSuccess,
  updatePillarItemError,
} from './actions';

const getPillarListRequest = async () => {
  return await client
    .get('/pillar')
    .then((user) => user.data)
    .catch((error) => {throw error.response.data});
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
    .catch((error) => {throw error.response.data});


function* addPillarItem({ payload }) {
  try {
    const response = yield call(addPillarItemRequest, payload);
    yield put(addPillarItemSuccess(response));
  } catch (error) {
    yield put(addPillarItemError(error));
  }
}

const updatePillarItemRequest = async ({pillar_id, pillar}) =>
  await client
    .post(`/pillar/update`, {pillar_id, ...pillar})
    .then((res) => res.data)
    .catch((error) => { throw error.response.data });


function* updatePillarItem({ payload }) {
  try {
    const response = yield call(updatePillarItemRequest, payload);
    yield put(updatePillarItemSuccess(response));
  } catch (error) {
    yield put(updatePillarItemError(error));
  }
}


const deletePillarItemRequest = async (item) => 
  await client
    .delete('/pillar', item)
    .then((user) => user.data)
    .catch((error) => {throw error.response.data});
function* deletePillarItem({ payload }) {
  try {
    const response = yield call(deletePillarItemRequest, payload);
    yield put(deletePillarItemSuccess(response));
  } catch (error) {
    yield put(deletePillarItemError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(PILLAR_LIST_GET_LIST, getPillarListItems);
}

export function* watchAddItem() {
  yield takeEvery(PILLAR_LIST_ADD_ITEM, addPillarItem);
}

export function* watchUpdatePillarItem() {
  yield takeEvery(PILLAR_LIST_UPDATE_ITEM, updatePillarItem);
}

export function* watchdeleteItem() {
  yield takeEvery(PILLAR_LIST_DELETE_ITEMS, deletePillarItem);
}

export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddItem), fork(watchUpdatePillarItem), fork(watchdeleteItem)]);
}
