import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { ORGANIZATION_LIST_GET_LIST, ORGANIZATION_LIST_ADD_ITEM, ORGANIZATION_LIST_DELETE_ITEMS } from '../actions';

import {
  getOrganizationListSuccess,
  getOrganizationListError,
  addOrganizationItemSuccess,
  addOrganizationItemError,
  deleteOrganizationItemsSuccess,
  deleteOrganizationItemsError,
} from './actions';

const getOrganizationListRequest = async () => 
  await client
    .get(`/organization`)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});  

function* getOrganizationListItems({payload}) {
  try {
    const response = yield call(getOrganizationListRequest);
    yield put(getOrganizationListSuccess(response));
  } catch (error) {
    yield put(getOrganizationListError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(ORGANIZATION_LIST_GET_LIST, getOrganizationListItems);
}


const addOrganizationItemRequest = async (payload) => 
  await client
    .post('/organization', payload)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});  

function* addOrganizationItem({payload}) {
  try {
    const response = yield call(addOrganizationItemRequest, payload);
    yield put(addOrganizationItemSuccess(response));
  } catch (error) {
    yield put(addOrganizationItemError(error));
  }
}

export function* watchAddItem() {
  yield takeEvery(ORGANIZATION_LIST_ADD_ITEM, addOrganizationItem);
}


const deleteOrganizationItemsRequest = async (payload) => 
  await client
    .delete('/organization', payload)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});  

function* deleteOrganizationItems({payload}) {
  try {
    const response = yield call(deleteOrganizationItemsRequest, payload);
    yield put(deleteOrganizationItemsSuccess(response));
  } catch (error) {
    yield put(deleteOrganizationItemsError(error));
  }
}

export function* watchDeleteItems() {
  yield takeEvery(ORGANIZATION_LIST_DELETE_ITEMS, deleteOrganizationItems);
}


export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddItem), fork(watchDeleteItems)]);
}
