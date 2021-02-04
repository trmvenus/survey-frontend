import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { 
  EMAIL_LINK_LIST_GET_LIST, 
  EMAIL_LINK_LIST_ADD_ITEM,
  EMAIL_LINK_LIST_UPDATE_ITEM, 
  EMAIL_LINK_LIST_DELETE_ITEM,
  EMAIL_LINK_LIST_SEND_EMAIL,
  EMAIL_LINK_LIST_GET_ITEM,
} from '../actions';
import { copySharedSurveyItems } from '../sharedSurvey/actions';

import {
  getEmailLinkListSuccess,
  getEmailLinkListError,
  addEmailLinkItemSuccess,
  addEmailLinkItemError,
  updateEmailLinkItemSuccess,
  updateEmailLinkItemError,
  deleteEmailLinkItemSuccess,
  deleteEmailLinkItemError,
  sendEmailLinkError,
  sendEmailLinkSuccess,
  getEmailLinkItemSuccess,
  getEmailLinkItemError,
} from './actions';

export function* watchGetList() {
  yield takeEvery(EMAIL_LINK_LIST_GET_LIST, getEmailLinkListItems);
}

const getEmailLinkListRequest = async (payload) =>
  await client
    .get(`/link/email?survey=${payload.id}`)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});

function* getEmailLinkListItems({payload}) {
  try {
    const response = yield call(getEmailLinkListRequest, payload);
    yield put(getEmailLinkListSuccess(response));
  } catch (error) {
    yield put(getEmailLinkListError(error));
  }
}


export function* watchGetItem() {
  yield takeEvery(EMAIL_LINK_LIST_GET_ITEM, getEmailLinkItem);
}

const getEmailLinkItemAsync = async (id) => 
  await client
    .get(`/link/email/${id}`)
    .then(res => res.data)
    .catch(error => {throw error.response.data});

function* getEmailLinkItem({payload}) {
  try {
    const {id} = payload;
    const response = yield call(getEmailLinkItemAsync, id);
    yield put(getEmailLinkItemSuccess(response));
  } catch (error) {
    yield put(getEmailLinkItemError(error));
  }
}


export function* watchAddItem() {
  yield takeEvery(EMAIL_LINK_LIST_ADD_ITEM, addEmailLinkItem);
}

const addEmailLinkItemRequest = async (item) => {
  const uploadForm = new FormData();

  uploadForm.append("file", item.contacts_file);
  uploadForm.append("item", JSON.stringify({...item, contacts_file: null}));

  return await client
    .postForm('/link/email', uploadForm)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data});
}

function* addEmailLinkItem({ payload }) {
  try {
    const response = yield call(addEmailLinkItemRequest, payload);
    yield put(addEmailLinkItemSuccess(response));
  } catch (error) {
    yield put(addEmailLinkItemError(error));
  }
}


export function* watchUpdateItem() {
  yield takeEvery(EMAIL_LINK_LIST_UPDATE_ITEM, updateEmailLinkItem);
}

const updateEmailLinkItemRequest = async (id, item) => 
  await client
      .put(`/link/email/${id}`, item)
      .then((res) => res.data)
      .catch((error) => {throw error.response.data}); 


function* updateEmailLinkItem({payload}) {
  const {id, item} = payload;
  try {
    const response = yield call(updateEmailLinkItemRequest, id, item);
    yield put(updateEmailLinkItemSuccess(response));
  } catch (error) {
    yield put(updateEmailLinkItemError(error));
  }
}


export function* watchDeleteItem() {
  yield takeEvery(EMAIL_LINK_LIST_DELETE_ITEM, deleteEmailLinkItem);
}

const deleteEmailLinkItemRequest = async (id) => 
  await client
    .delete(`/link/email/${id}`)
    .then((res) => res.data)
    .catch((err) => {throw err.response.data});  

function* deleteEmailLinkItem({payload}) {
  try {
    const response = yield call(deleteEmailLinkItemRequest, payload.id);
    yield put(deleteEmailLinkItemSuccess(response));
  } catch (error) {
    yield put(deleteEmailLinkItemError(error));
  }
}


export function* watchSendEmail() {
  yield takeEvery(EMAIL_LINK_LIST_SEND_EMAIL, sendEmailLink);
}

const sendEmailLinkRequest = async (id) =>
  await client 
    .get(`/link/email/${id}/send`)
    .then(res => res.data)
    .catch(err => {throw err.response.data});

function* sendEmailLink({payload}) {
  try {
    const response = yield call(sendEmailLinkRequest, payload.id);
    yield put(sendEmailLinkSuccess(response));
  } catch (error) {
    yield put(sendEmailLinkError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchGetList), 
    fork(watchGetItem),
    fork(watchAddItem), 
    fork(watchUpdateItem), 
    fork(watchDeleteItem), 
    fork(watchSendEmail),
  ]);
}
