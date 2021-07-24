import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { client } from '../../helpers/client';

import { CATEGORY_LIST_GET_LIST, CATEGORY_LIST_ADD_ITEM, CATEGORY_DELETE_ITEM, CATEGORY_DELETE_ITEM_ERROR, CATEGORY_UPDATE_ITEM } from '../actions';

import {
  getCategoryListSuccess,
  getCategoryListError,
  addCategoryItemSuccess,
  addCategoryItemError,
  deleteCategoryItemSuccess,
  deleteCategoryItemError,
  updateCategoryItemSuccess,
  updateCategoryItemError,
} from './actions';

const getCategoryListRequest = async () => {
  return await client
    .get('/category')
    .then((user) => user.data)
    .catch((error) => {throw error.response.data});
}


function* getCategoryListItems() {
  try {
    const response = yield call(getCategoryListRequest);
    yield put(getCategoryListSuccess(response));
  } catch (error) {
    yield put(getCategoryListError(error));
  }
}

const addCategoryItemRequest = async (item) => 
  await client
    .post('/category', item)
    .then((user) => user.data)
    .catch((error) => {throw error.response.data});


function* addCategoryItem({ payload }) {
  try {
    const response = yield call(addCategoryItemRequest, payload);
    yield put(addCategoryItemSuccess(response));
  } catch (error) {
    yield put(addCategoryItemError(error));
  }
}

const deleteCategoryItemRequest = async (item) => 
  await client
    .delete('/category',item)
    .then((user) => user.data)
    .catch((error) => {
      throw error.response.data
    })

function* deleteCategoryItem({ payload }) {
  try {
    const response = yield call(deleteCategoryItemRequest, payload);
    yield put(deleteCategoryItemSuccess(response));
  } catch (error) {
    yield put(deleteCategoryItemError(error))
  }
}

const updateCategoryItemRequest = async (item) => 
  await client
    .put('/category',item)
    .then((cat) => cat.data)
    .catch((error) => {
      throw error.response.data
    })

function* updateCategoryItem({payload}) {
  try {
    const response = yield call(updateCategoryItemRequest,payload);
    yield put(updateCategoryItemSuccess(response));
  } catch (error) {
    yield put(updateCategoryItemError(error))
  }
}

export function* watchGetList() {
  yield takeEvery(CATEGORY_LIST_GET_LIST, getCategoryListItems);
}

export function* watchAddItem() {
  yield takeEvery(CATEGORY_LIST_ADD_ITEM, addCategoryItem);
}

export function* watchDeleteItem() {
  yield takeEvery(CATEGORY_DELETE_ITEM, deleteCategoryItem)
}


export function* watchUpdateItem() {
  yield takeEvery(CATEGORY_UPDATE_ITEM,updateCategoryItem)
}
export default function* rootSaga() {
  yield all([fork(watchGetList), fork(watchAddItem), fork(watchDeleteItem),fork(watchUpdateItem)]);
}
