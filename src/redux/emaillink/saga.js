import { all, call, fork, put, take, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { 
  EMAIL_LINK_LIST_GET_LIST, 
  EMAIL_LINK_LIST_ADD_ITEM,
  EMAIL_LINK_LIST_UPDATE_ITEM, 
  EMAIL_LINK_LIST_DELETE_ITEM,
  EMAIL_LINK_LIST_SEND_EMAIL,
  EMAIL_LINK_LIST_GET_ITEM,
  EMAIL_LINK_LIST_SEND_EMAIL_CONTACT,
  EMAIL_LINK_LIST_CHECK_EMAIL_INVITED,
  CONTACT_ADD_ITEM,
  CONTACT_UPDATE_ITEM,
  CONTACT_UPDATE_ITEM_ERROR,
  CONTACT_UPDATE_ITEM_SUCCESS,
  CONTACT_ADD_ITEM_SUCCESS,
  CONTACT_ADD_ITEM_ERROR,
  CONTACT_DELETE_ITEM
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
  sendEmailContactSuccess,
  sendEmailContactError,
  checkIfEmailIsInvitedSuccess,
  checkIfEmailIsInvitedError,
  addContactItemSuccess,
  addContactItemError,
  deleteContactItemSuccess,
  deleteContactItemError,
  updateContactItemSuccess,
  updateContactItemError
  
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
    .post(`/link/email/${id}`)
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

export function* watchContactAddItem(){
  yield takeEvery(CONTACT_ADD_ITEM,addContactItem);
}

const addContactItemRequest = async (item) => {
  return await client
    .post('/link/email/contact/add',item)
    .then((res) => res.data)
    .catch((error) => {throw error.response.data;})
}
function* addContactItem({payload}){
  try{
    const response = yield call(addContactItemRequest,payload)
    yield put(getEmailLinkItemSuccess(response));
  } catch(error) {
    yield put(addContactItemError(error))
  }
}

export function* watchContactUpdateItem() {
  yield takeEvery(CONTACT_UPDATE_ITEM, updateContactItem)
}

const updateContactItemRequest = async (id, item) => {
  return await client
    .put(`/link/email/contact/${id}`, item)
    .then((res)=>res.data)
    .catch((err)=> { throw err.response.data})
}
function* updateContactItem({payload}){
  try{
    const {id, item} = payload;
    const response = yield call(updateContactItemRequest, id.id, item)
    yield put(getEmailLinkItemSuccess(response))
  }catch(error) {
    yield put(updateContactItemError(error))
  }
}

export function* watchContactDeleteItem(){
  yield takeEvery(CONTACT_DELETE_ITEM, deleteContactItem);
}

const deleteContactItemRequest = async (item) => {
  return await client
    .delete('/link/email/contact/delete',item)
    .then((res) => res.data)
    .catch((err)=> { throw err.response.data})
}

function* deleteContactItem({payload}){ 
  try{
    const response= yield call(deleteContactItemRequest, payload);
    yield put(getEmailLinkItemSuccess(response))
  } catch(error) {
    yield put(deleteContactItemError(error))
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


export function* watchSendEmailContact() {
  yield takeEvery(EMAIL_LINK_LIST_SEND_EMAIL_CONTACT, sendEmailContact);
}

const sendEmailContactRequest = async (id, email) =>
  await client 
    .get(`/link/email/${id}/send?email=${email}`)
    .then(res => res.data)
    .catch(err => {throw err.response.data});

function* sendEmailContact({payload}) {
  try {
    const {id, email} = payload;
    const response = yield call(sendEmailContactRequest, id, email);
    yield put(sendEmailContactSuccess(response));
  } catch (error) {
    yield put(sendEmailContactError(error));
  }
}


export function* watchCheckIfEmailIsInvited() {
  yield takeEvery(EMAIL_LINK_LIST_CHECK_EMAIL_INVITED, checkIfEmailIsInvited);
}

const checkIfEmailIsInvitedAsync = async (link_id, email) =>
  await client
    .get(`/link/email/check?share=${link_id}&email=${email}`)
    .then(res => res.data)
    .catch(err => {throw err.response.data});

function* checkIfEmailIsInvited({payload}) {
  try {
    const {link_id, email} = payload;
    const response = yield call(checkIfEmailIsInvitedAsync, link_id, email);
    yield put(checkIfEmailIsInvitedSuccess(response));
  } catch (error) {
    yield put(checkIfEmailIsInvitedError(error));
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
    fork(watchSendEmailContact),
    fork(watchCheckIfEmailIsInvited),
    fork(watchContactAddItem),
    fork(watchContactDeleteItem),
    fork(watchContactUpdateItem)
  ]);
}
