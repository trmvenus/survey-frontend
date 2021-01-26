import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { 
  WEB_LINK_LIST_GET_LIST, 
  WEB_LINK_LIST_ADD_ITEM,
  WEB_LINK_LIST_UPDATE_ITEM, 
  WEB_LINK_LIST_DELETE_ITEM,
} from '../actions';

import {
  getWebLinkListSuccess,
  getWebLinkListError,
  addWebLinkItemSuccess,
  addWebLinkItemError,
  updateWebLinkItemSuccess,
  updateWebLinkItemError,
  deleteWebLinkItemSuccess,
  deleteWebLinkItemError,
} from './actions';

const getWebLinkListRequest = async (payload) =>
  await client
    .get(`/link/web?survey=${payload.id}`)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});

function* getWebLinkListItems({payload}) {
  try {
    const response = yield call(getWebLinkListRequest, payload);
    yield put(getWebLinkListSuccess(response));
  } catch (error) {
    yield put(getWebLinkListError(error));
  }
}

export function* watchGetList() {
  yield takeEvery(WEB_LINK_LIST_GET_LIST, getWebLinkListItems);
}


const addWebLinkItemRequest = async (item) => 
  await client
    .post('/link/web', item)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});

function* addWebLinkItem({ payload }) {
  try {
    const response = yield call(addWebLinkItemRequest, payload);
    yield put(addWebLinkItemSuccess(response));
  } catch (error) {
    yield put(addWebLinkItemError(error));
  }
}

export function* watchAddItem() {
  yield takeEvery(WEB_LINK_LIST_ADD_ITEM, addWebLinkItem);
}


const updateWebLinkItemRequest = async (id, item) => 
  await client
      .put(`/link/web/${id}`, item)
      .then((res) => res.data)
      .catch((error) => {throw error.response.data}); 


function* updateWebLinkItem({payload}) {
  const {id, item} = payload;
  try {
    const response = yield call(updateWebLinkItemRequest, id, item);
    yield put(updateWebLinkItemSuccess(response));
  } catch (error) {
    yield put(updateWebLinkItemError(error));
  }
}

export function* watchUpdateItem() {
  yield takeEvery(WEB_LINK_LIST_UPDATE_ITEM, updateWebLinkItem);
}


const deleteWebLinkItemRequest = async (id) => 
  await client
    .delete(`/link/web/${id}`)
    .then((res) => res.data)
    .catch((err) => {throw err.response.data});  

function* deleteWebLinkItem({payload}) {
  try {
    const response = yield call(deleteWebLinkItemRequest, payload.id);
    yield put(deleteWebLinkItemSuccess(response));
  } catch (error) {
    yield put(deleteWebLinkItemError(error));
  }
}

export function* watchDeleteItem() {
  yield takeEvery(WEB_LINK_LIST_DELETE_ITEM, deleteWebLinkItem);
}


export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddItem), fork(watchUpdateItem), fork(watchDeleteItem), ]);
}
